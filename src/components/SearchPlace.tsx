"use client";

import {
  setVisitPlace,
  visitPlaceSelector,
} from "@/lib/slices/visitPlaceSlice";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function SearchPlace() {
  const query = useSelector(visitPlaceSelector).query;
  const dispatch = useDispatch();
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const changeQuery = (e: ChangeEvent<HTMLInputElement>) => {
    setIsTyping(true);
    const input = e.target.value;
    dispatch(setVisitPlace(input));
  };

  return (
    <div className="flex flex-col px-6 w-full h-12">
      <div>방문 장소 검색</div>
      <input
        className="w-full h-full bg-white text-black"
        value={query}
        onChange={changeQuery}
      ></input>
      {isTyping ? <ul id="searchList"></ul> : ""}
    </div>
  );
}

export default SearchPlace;
