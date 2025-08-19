"use client";

import { useEffect, useRef } from "react";
import { apiSrc } from "@/api";
import SDKLoader from "@/lib/kakaoMap/SDKLoader";
declare global {
  interface Window {
    kakao: typeof kakao;
  }
}
export default function Home() {
  useEffect(() => {
    SDKLoader()
      .then(() => {
        //sdk를 불러왔다면 promise의 fulfilled 함수로 지도를 dom에 집어넣기
        if (window.kakao && window.kakao.maps) {
          inputMapContainer();
        } else {
          console.error("Kakao maps not available");
        }
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div>
      <div className="w-full h-screen static" id="map"></div>
    </div>
  );

  function inputMapContainer() {
    window.kakao.maps.load(() => {
      console.log("Kakao Maps Loaded");

      const coords = new window.kakao.maps.LatLng(33.5563, 126.79581);
      const container = document.getElementById("map");

      if (container) {
        const options = { center: coords, level: 3 };
        const map = new window.kakao.maps.Map(container, options);
        map.setCenter(coords);
      } else {
        console.error("Map container not found");
      }
    });
  }
}
