import { useDispatch, useSelector } from "react-redux";
import AdjustCalendar from "./AdjustCalendar";
import { VisitTimeSelector } from "@/lib/slices/visitTimeSelector";
import React, { RefObject, useRef } from "react";
import { setVisitTime } from "@/lib/slices/visitTimeSlice";
export function AdjustTimeBar() {
  const { visitTime, outTime } = useSelector(VisitTimeSelector);
  const visitTimeRef = useRef<React.ReactNode>(null);
  const outTimeRef = useRef<React.ReactNode>(null);
  const dispatch = useDispatch();

  function selectDateAction(date: Date, ref: RefObject<React.ReactNode>) {
    if (ref === visitTimeRef) {
      dispatch(setVisitTime(date.toISOString()));
    } else if (ref === outTimeRef) {
      dispatch(setVisitTime(date.toISOString()));
    }
  }
  return (
    <div className="flex flex-row justify-between px-4 w-full">
      <AdjustCalendar
        date={visitTime}
        ref={visitTimeRef}
        selectDateAction={selectDateAction}
      />
      <AdjustCalendar
        date={outTime}
        ref={outTimeRef}
        selectDateAction={selectDateAction}
      />
    </div>
  );
}
