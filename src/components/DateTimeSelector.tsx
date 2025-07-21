"use client";
import { visitActionType } from "@/lib/reducer";
import { getWeekday } from "@/utils/getWeekday";
import React, { useEffect, useState } from "react";
import AdjustCalendar from "./AdjustCalendar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";

type VisitDateTime = {
  date: Date;
  selectType: visitActionType;
};
function DateTimeSelector({ date, selectType }: VisitDateTime) {
  const currentDate: string = useSelector(
    (state: RootState) => state[selectType]
  );
  const [isCalendar, useIsCalendar] = useState<boolean>(false);
  useEffect(() => {
    useIsCalendar(false);
  }, [currentDate]);

  const dispatch = useDispatch();
  const selectDateAction = (date: Date) => {
    dispatch({
      type: selectType,
      payload: date.toISOString(),
    });
  };

  return (
    <div className="flex flex-row justify-between">
      <div className="flex flex-col">
        <p
          onClick={() => {
            useIsCalendar((current) => !current);
          }}
        >
          {date.getMonth() + 1}월 {date.getDate()}일 {getWeekday(date)}
        </p>
        {isCalendar ? (
          <AdjustCalendar date={date} selectDateAction={selectDateAction} />
        ) : (
          ""
        )}
      </div>
      <div>{date.getHours()}시</div>
    </div>
  );
}

export default DateTimeSelector;
