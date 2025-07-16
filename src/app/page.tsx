"use client";

import { useEffect, useRef } from "react";
import { apiSrc } from "@/api";
declare global {
  interface Window {
    kakao: any;
  }
}
export default function Home() {
  useEffect(() => {
    if (typeof window === undefined) return;

    if (document.querySelector(`script[src="${apiSrc}"]`)) {
      console.log("Script already exists");
      return;
    }
    const script: HTMLScriptElement = document.createElement("script");
    script.async = true;
    script.src = apiSrc;
    document.head.appendChild(script);
    console.log("useEffect");
    script.onload = () => {
      console.log("Script loaded");
      if (window.kakao && window.kakao.maps) {
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
      } else {
        console.error("Kakao maps not available");
      }
    };
  }, []);

  return (
    <div>
      <h1>KAKAOMAp</h1>
      <div className="w-200 h-100" id="map"></div>
    </div>
  );
}
