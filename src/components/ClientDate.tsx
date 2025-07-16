"use client";

import useVisitDate from "@/hooks/useVisitDate";

function ClientDate() {
  const currentDate = useVisitDate();
  return <div>{currentDate}</div>;
}

export default ClientDate;
