"use client";

import { currentTimeSelector } from "@/lib/slices/visitTimeSelector";
import { getWeekday } from "@/utils/getWeekday";
import { useSelector } from "react-redux";

function ClientDate() {
  const currentTime = useSelector(currentTimeSelector);
  return (
    <div>
      오늘은{" "}
      {`${currentTime.getMonth() + 1}월 ${currentTime.getDate()}일 ${getWeekday(
        currentTime
      )}`}
    </div>
  );
}

export default ClientDate;
