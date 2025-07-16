"use client";

import { useState } from "react";
import AdjustTime from "./AdjustTime";

function AdjustBar() {
  const [isAdjustTime, setisAdjustTime] = useState(true);

  return (
    <div className="flex items-center justify-center">
      {isAdjustTime ? (
        <AdjustTime />
      ) : (
        <p>방문 시간 및 날짜 조절하기 클릭 🔻</p>
      )}
    </div>
  );
}

export default AdjustBar;
