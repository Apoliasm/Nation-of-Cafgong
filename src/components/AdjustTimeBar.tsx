import { useDispatch, useSelector } from "react-redux";
import VisitTimeCalendar from "./VisitTimeCalendar";

import React, { RefObject, useRef } from "react";
import VisitTimePicker, { OptionType, SelectCompType } from "./VisitTimePicker";
import {
  setOutDate,
  setOutHour,
  setVisitDate,
  setVisitHour,
  visitTimeSelector,
} from "@/lib/slices/visitTimeSlice";
import compareLocaleDateSame from "@/utils/compareLocaleDate";

export function AdjustTimeBar() {
  const now = new Date();
  const nowHour = now.getHours();
  const { visitDate, outDate, visitHour, outHour } =
    useSelector(visitTimeSelector);
  const visitCalendarRef = useRef<React.ReactNode>(null);
  const visitHourPickerRef = useRef<SelectCompType>(null);
  const outHourPickerRef = useRef<SelectCompType>(null);
  const dispatch = useDispatch();

  function selectDateAction(date: Date, ref: RefObject<React.ReactNode>) {
    if (ref === visitCalendarRef) {
      date.setHours(visitHour);
      dispatch(setVisitDate(date.toLocaleDateString("ko-KR")));
    }
  }

  function selectHourAction(
    hour: number,
    ref: RefObject<SelectCompType | null>
  ) {
    if (ref === visitHourPickerRef) {
      dispatchVisitHour(hour);
    } else if (ref === outHourPickerRef) {
      dispatchOutHour(hour);
    }
  }
  function dispatchVisitHour(hour: number) {
    if (compareLocaleDateSame(now, visitDate) && nowHour > hour) {
      alert("현재 시간보다 이전 시간을 선택할 수 없습니다.");
      return;
    }
    dispatch(setVisitHour(hour));
    if (outHour < hour) {
      dispatch(setOutHour(hour + 1));
    }
  }

  function dispatchOutHour(hour: number) {
    if (visitHour > hour) {
      if (hour > 5) {
        alert("입장 시간보다 퇴장 시간이 빠를 수 없습니다");
        return;
      } else {
        const tomorrow = new Date(outDate);
        tomorrow.setDate(outDate.getDate() + 1);

        dispatch(setOutHour(hour));
        dispatch(setOutDate(tomorrow.toLocaleDateString()));
      }
    } else {
      dispatch(setOutHour(hour));
    }
  }

  return (
    <div className="flex flex-col justify-center px-4 w-full">
      <div className="flex flex-col w-full">
        <div className="flex justify-center">
          <p>카페 방문 날짜 설정하기</p>
        </div>
        <div className="flex justify-center">
          <VisitTimeCalendar
            date={visitDate}
            ref={visitCalendarRef}
            selectDateAction={selectDateAction}
          />
        </div>
      </div>
      <div className="flex flex-row py-3">
        <div className="flex flex-col items-center justify-center w-full">
          <p>언제부터</p>
          <div className="flex items-center justify-center w-full">
            <VisitTimePicker
              date={visitDate}
              hour={visitHour}
              ref={visitHourPickerRef}
              selectAction={selectHourAction}
            />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-full">
          <p>언제까지</p>
          <div className="flex items-center justify-center w-full">
            <VisitTimePicker
              date={outDate}
              hour={outHour}
              ref={outHourPickerRef}
              selectAction={selectHourAction}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
