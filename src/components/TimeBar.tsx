"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  isAdjustTimeActiveSelctor,
  VisitTimeSelector,
} from "@/lib/slices/visitTimeSelector";
import { toggleAdjustTime } from "@/lib/slices/visitTimeSlice";
import { getWeekday } from "@/utils/getWeekday";
import { AdjustTimeBar } from "./AdjustTimeBar";

export default function TimeBar() {
  const { visitTime, outTime } = useSelector(VisitTimeSelector);
  const dispatch = useDispatch();
  const isAdjustTimeActive = useSelector(isAdjustTimeActiveSelctor);
  return (
    <div className="flex flex-col px-2 w-full">
      <div className="flex flex-row px-6 w-full">
        <div className="flex flex-col w-1/2 px-8">
          <div>언제부터</div>
          <div>
            <p>
              {visitTime.getMonth() + 1}월 {visitTime.getDate()}일{" "}
              {getWeekday(visitTime)}
            </p>
          </div>
        </div>
        <div className="flex flex-col w-1/2 px-8">
          <div>언제까지</div>
          <div>
            <p>
              {outTime.getMonth() + 1}월 {outTime.getDate()}일{" "}
              {getWeekday(outTime)}
            </p>
          </div>
        </div>
      </div>
      <div className="flex px-6 py-2">
        {isAdjustTimeActive ? <AdjustTimeBar></AdjustTimeBar> : ""}
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
