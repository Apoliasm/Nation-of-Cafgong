import React, { RefObject } from "react";
import Calendar from "react-calendar";
import { useDispatch } from "react-redux";

type CalendarType = {
  date: Date;
  ref: RefObject<React.ReactNode>;
  selectDateAction: (date: Date, ref: RefObject<React.ReactNode>) => void;
};
export default function VisitTimeCalendar({
  date,
  ref,
  selectDateAction,
}: CalendarType) {
  return (
    <Calendar
      className="w-1/2 px-3"
      ref={ref}
      defaultValue={date}
      minDate={new Date(Date.now())}
      view="month"
      value={date}
      formatDay={(locale, date) => `${date.getDate()}`}
      onClickDay={(selected: Date) => {
        selectDateAction(selected, ref);
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
  );
}
