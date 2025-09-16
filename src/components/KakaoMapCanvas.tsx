"use client";

import { useEffect, useRef } from "react";
import SDKLoader from "@/lib/kakaoMap/SDKLoader";
import { useSelector } from "react-redux";
import { visitPlaceSelector } from "@/lib/slices/visitPlaceSlice";

export interface PlaceInfo {
  address_name: string | undefined;
  category_group_code: string | undefined;
  category_group_name: string | undefined;
  category_name: string | undefined;
  distance: string | undefined;
  id: string | undefined;
  phone: string | undefined;
  place_name: string | undefined;
  place_url: string | undefined;
  road_address_name: string | undefined;
  x: string | undefined;
  y: string | undefined;
}

export default function KakaoMapCanvas() {
  const elementRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<kakao.maps.Map | null>(null);
  const searchRef = useRef<kakao.maps.services.Places | null>(null);
  const placeQuery = useSelector(visitPlaceSelector).query;
  let markers = [];

  useEffect(() => {
    let disposed = false;
    SDKLoader()
      .then(() => {
        if (disposed) return;
        if (mapRef.current) return; // 이미 있으면 스킵
        if (!elementRef.current) return; // DOM 체크

        // SDKLoader가 resolve된 시점이면 kakao.maps는 준비 완료 상태
        const center = new kakao.maps.LatLng(33.5563, 126.79581);
        const map = new kakao.maps.Map(elementRef.current, {
          center,
          level: 3,
        });
        mapRef.current = map;
        if (!searchRef.current) {
          searchRef.current = new kakao.maps.services.Places(map);
        }
      })
      .catch(console.error);

    return () => {
      disposed = true;
      mapRef.current = null;
      searchRef.current = null;
    };
  }, []);

  // 방문 장소 입력에 따른 effect -> 검색 기능 실행
  //타이핑 후 2초 뒤에 검색 실행 -> 여러번 검색 방지
  //1초 전에 새로운 결과가 들어오면 return 함수 발동 -> timeout 큐에서 제거
  useEffect(() => {
    if (!placeQuery.trim()) return;
    const delaySearch = setTimeout(() => {
      searchRequest(placeQuery);
    }, 2000);
    return () => clearTimeout(delaySearch);
  }, [placeQuery]);

  //검색 결과 요청 함수
  function searchRequest(inputQuery: string) {
    const map = mapRef.current;
    if (!map) return;
    let query = inputQuery.trim();
    query = `${query} 카페`;
    if (!query) return;

    // query 변화에 따른 마커/뷰 갱신 로직 등...
    if (!searchRef.current) return;
    let result = [];
    searchRef.current.keywordSearch(query, searchPlace);
  }

  function searchPlace(
    result: PlaceInfo[],
    status: kakao.maps.services.Status,
    pagination: kakao.maps.services.Pagination
  ) {
    if (status === kakao.maps.services.Status.OK) {
      moveCenter(result[0]);
      displayPlace(result);
    } else {
      console.log("notok");
    }
  }

  function displayPlace(result: PlaceInfo[]) {
    result.forEach((place, index) => {
      let placePosition = new kakao.maps.LatLng(
        Number(place.y),
        Number(place.x)
      );
      let marker = addMarker(placePosition, index);
      marker.setMap(mapRef.current);
      markers.push(marker);
    });
  }

  function moveCenter(place: PlaceInfo) {
    if (!place.x || !place.y) return;
    let position = new kakao.maps.LatLng(Number(place.y), Number(place.x));
    mapRef.current?.setCenter(position);
  }

  function addMarker(position: kakao.maps.LatLng, index: number) {
    let imageSrc =
        "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png",
      imageSize = new kakao.maps.Size(36, 36),
      imgOptions = {
        spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
        spriteOrigin: new kakao.maps.Point(0, index * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
        offset: new kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
      },
      markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
      marker = new kakao.maps.Marker({
        position: position, // 마커의 위치
        image: markerImage,
      });

    return marker;
  }
  function displayPagination() {}
  function removeMarker() {
    markers = [];
  }

  return <div id="map" ref={elementRef} className="w-full h-screen" />;
}
