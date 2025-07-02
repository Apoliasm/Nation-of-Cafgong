"use client";

import { useState } from "react";

function useVisitDate() {
  const [date, useDate] = useState<Date>(new Date());

  const dateString: (date: Date) => string = (date: Date) => {
    const month: number = date.getMonth();
    const todayDate: number = date.getDate();
    const hour: number = date.getHours();
    const minute: number = date.getMinutes();

    return `${month}월 ${todayDate}일 ${hour}시 ${minute}분`;
  };
  return dateString(date);
}

export default useVisitDate;
