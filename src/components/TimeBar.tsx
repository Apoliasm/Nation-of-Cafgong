"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  isAdjustTimeActiveSelctor,
  toggleAdjustTime,
  visitTimeSelector,
} from "@/lib/slices/visitTimeSlice";
import { getWeekday } from "@/utils/getWeekday";
import { AdjustTimeBar } from "./AdjustTimeBar";
import SearchPlace from "./SearchPlace";

export default function TimeBar() {
  const { visitDate, outDate, visitHour, outHour } =
    useSelector(visitTimeSelector);
  const dispatch = useDispatch();
  const isAdjustTimeActive = useSelector(isAdjustTimeActiveSelctor);
  return (
    <div className="flex flex-col px-2 w-full">
      <div className="flex flex-row px-6 w-full">
        <div className="flex flex-col w-1/2 px-8">
          <div>언제부터</div>
          <div className="flex flex-row justify-between w-full">
            <p>
              {visitDate.getMonth() + 1}월 {visitDate.getDate()}일{" "}
              {getWeekday(visitDate)}
            </p>
            <p>{visitHour}시</p>
          </div>
        </div>
        <div className="flex flex-col w-1/2 px-8">
          <div>언제까지</div>
          <div className="flex flex-row justify-between w-full">
            <p>
              {outDate.getMonth() + 1}월 {outDate.getDate()}일{" "}
              {getWeekday(outDate)}
            </p>
            <p>{outHour}시</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col px-6 py-2">
        {isAdjustTimeActive ? <AdjustTimeBar></AdjustTimeBar> : ""}
        {isAdjustTimeActive ? <SearchPlace></SearchPlace> : ""}
      </div>

      <div className="flex items-center justify-center py-2">
        {isAdjustTimeActive ? (
          <p
            onClick={() => {
              dispatch(toggleAdjustTime());
            }}
          >
            접기 🔺
          </p>
        ) : (
          <p
            onClick={() => {
              dispatch(toggleAdjustTime());
            }}
          >
            클릭해서 방문 시간 및 날짜 조절하기 🔻
          </p>
        )}
      </div>
    </div>
  );
}
