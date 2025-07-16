"use client";
import React, { useState } from "react";
import Calendar from "react-calendar";

type VisitDateTime = {
  date: Date;
};
function DateTimeSelector(props: VisitDateTime) {
  const [date, useDate] = useState<Date>(props.date);
  const [isCalendar, useIsCalendar] = useState<boolean>(false);

  return (
    <div className="flex-col">
      <div
        className="flex-row"
        onClick={() => {
          useIsCalendar((current) => !current);
        }}
      >
        {date.getMonth() + 1}월 {date.getDate()}일
      </div>
      {isCalendar ? (
        <Calendar
          className=""
          defaultValue={date}
          minDate={new Date(Date.now())}
          onClickDay={(selected: Date) => {
            useDate(selected);
            useIsCalendar((current) => !current);
          }}
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
      <div>{date.getHours()}시</div>
    </div>
  );
}

export default DateTimeSelector;
