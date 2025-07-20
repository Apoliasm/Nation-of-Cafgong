"use client";

import { currentTimeSelector } from "@/lib/selector";
import { RootState } from "@/lib/store";
import { getWeekday } from "@/utils/getWeekday";
import { useSelector } from "react-redux";

function ClientDate() {
  const currentTime = useSelector(currentTimeSelector);
  return (
    <div>{`${
      currentTime.getMonth() + 1
    }월 ${currentTime.getDate()}일 ${getWeekday(currentTime)}`}</div>
  );
}

export default ClientDate;
