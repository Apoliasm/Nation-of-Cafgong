import { visitActionType } from "@/lib/reducer";
import React from "react";
import Calendar from "react-calendar";
import { useDispatch } from "react-redux";

type CalendarType = {
  date: Date;
  selectDateAction: (date: Date) => void;
};
export default function AdjustCalendar({
  date,
  selectDateAction,
}: {
  date: Date;
  selectDateAction: (date: Date) => void;
}) {
  const dispatch = useDispatch();
  return (
    <Calendar
      className=""
      defaultValue={date}
      minDate={new Date(Date.now())}
      view="month"
      value={date}
      formatDay={(locale, date) => `${date.getDate()}`}
      onClickDay={(selected: Date) => {
        selectDateAction(selected);
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
