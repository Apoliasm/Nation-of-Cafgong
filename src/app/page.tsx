"use client";

import KakaoMapCanvas from "@/components/KakaoMapCanvas";
declare global {
  interface Window {
    kakao: typeof kakao;
  }
}
export default function Home() {
  return <KakaoMapCanvas />;
}
