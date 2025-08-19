import { apiSrc } from "@/api";

let loading: Promise<void> | null = null;
function SDKLoader() {
  if (typeof window === "undefined") return Promise.resolve();

  if (loading) return loading;

  if (window.kakao && window.kakao.maps) return Promise.resolve();

  if (!loading) {
    const exist = document.querySelector<HTMLScriptElement>(
      `script[src="${apiSrc}"]`
    );

    loading = new Promise<void>((resolve, reject) => {
      const target = exist ?? document.createElement("script");
      if (!exist) {
        target.async = true;
        target.src = apiSrc;
        document.head.appendChild(target);
      }

      target.addEventListener("load", onReady);
      target.addEventListener("error", onError);
      function onReady() {
        try {
          // autoload=false를 썼다면 실제 리소스 로딩 필요
          if (window.kakao?.maps?.load) {
            window.kakao.maps.load(() => resolve());
          } else {
            resolve();
          }
        } catch (e) {
          cleanup();
          loading = null; // 실패 시 다음 호출에서 재시도 가능
          reject(e instanceof Error ? e : new Error(String(e)));
        }
      }

      function onError() {
        cleanup();
        loading = null;
        reject(new Error("Kakao SDK script load error"));
      }

      function cleanup() {
        target.removeEventListener("load", onReady);
        target.removeEventListener("error", onError);
        clearTimeout(timeoutId);
      }
      const timeoutId = window.setTimeout(() => {
        cleanup();
        if (!exist) target.remove();
        loading = null;
        reject(new Error("Kakao SDK load timeout"));
      }, 15000);
    });
  }

  return loading;
}

export default SDKLoader;
