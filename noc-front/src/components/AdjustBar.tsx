"use client";

import { useState } from "react";

function AdjustBar() {
  const [isBar, setIsBar] = useState<boolean>(false);

  return (
    <div className="flex items-center justify-center">
      <p>방문 시간 및 날짜 조절</p>
      {isBar ? <div className="flex items-center"></div> : <p> 🔻 </p>}
    </div>
  );
}

export default AdjustBar;
