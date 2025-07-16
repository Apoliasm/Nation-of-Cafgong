"use client";

import { useState } from "react";

function AdjustTime() {
  const [startTime, setStartTime] = useState<Date>(new Date(Date.now()));
  const [endTime, setEndTime] = useState<Date>(new Date(Date.now()));

  return (
    <div className="flex-row">
      <div>언제부터</div>
      <div>{startTime.toDateString()}</div>
      <div>언제까지</div>
      <div>{endTime.toDateString()}</div>
    </div>
  );
}

export default AdjustTime;
