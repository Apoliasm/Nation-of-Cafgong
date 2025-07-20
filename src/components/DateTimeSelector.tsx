"use client";
import { visitActionType } from "@/lib/reducer";
import { getWeekday } from "@/utils/getWeekday";
import React, { useState } from "react";
import Calendar from "react-calendar";
import { useDispatch } from "react-redux";

type VisitDateTime = {
  date: Date;
  selectType: visitActionType;
};
function DateTimeSelector({ date, selectType }: VisitDateTime) {
  const [isCalendar, useIsCalendar] = useState<boolean>(false);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-row px-10 w-full justify-between">
      <div className="flex flex-col">
        <p
          onClick={() => {
            useIsCalendar((current) => !current);
          }}
        >
          {date.getMonth() + 1}월 {date.getDate()}일 {getWeekday(date)}
        </p>
        {isCalendar ? (
          <Calendar
            className=""
            defaultValue={date}
            minDate={new Date(Date.now())}
            view="month"
            value={date}
            formatDay={(locale, date) => `${date.getDate()}`}
            onClickDay={(selected: Date) => {
              dispatch({ type: selectType, payload: selected.toISOString() });
              useIsCalendar((current) => !current);
            }}
            maxDetail="month"
            minDetail="month"
            tileDisabled={({
              activeStartDate,
              date,
            }: {
              activeStartDate: Date;
              date: Date;
            }) => {
              return date < activeStartDate;
            }}
          ></Calendar>
        ) : (
          ""
        )}
      </div>
      <div>{date.getHours()}시</div>
    </div>
  );
}

export default DateTimeSelector;
