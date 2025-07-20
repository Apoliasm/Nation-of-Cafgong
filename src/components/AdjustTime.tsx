"use client";
import DateTimeSelector from "./DateTimeSelector";
import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import { VisitTimeSelector } from "@/lib/selector";
function AdjustTime() {
  const { visitTime, outTime } = useSelector(VisitTimeSelector);

  return (
    <div className="flex flex-col px-5 w-full">
      <div>언제부터</div>
      <DateTimeSelector date={visitTime} selectType="VISIT"></DateTimeSelector>
      <div>언제까지</div>
      <DateTimeSelector date={outTime} selectType="OUT"></DateTimeSelector>
    </div>
  );
}

export default AdjustTime;
