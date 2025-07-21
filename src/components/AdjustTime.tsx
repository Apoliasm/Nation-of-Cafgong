"use client";
import DateTimeSelector from "./DateTimeSelector";
import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import { VisitTimeSelector } from "@/lib/selector";
function AdjustTime() {
  const { visitTime, outTime } = useSelector(VisitTimeSelector);

  return (
    <div className="flex flex-row px-5 w-full">
      <div className="w-1/2 px-1">
        <div>언제부터</div>
        <DateTimeSelector
          date={visitTime}
          selectType="visitTime"
        ></DateTimeSelector>
      </div>
      <div className="w-1/2 px-1">
        <div>언제까지</div>
        <DateTimeSelector
          date={outTime}
          selectType="outTime"
        ></DateTimeSelector>
      </div>
    </div>
  );
}

export default AdjustTime;
