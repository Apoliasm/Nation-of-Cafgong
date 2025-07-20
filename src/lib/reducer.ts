export type visitTimeType = {
  visitTime: string;
  outTime: string;
};

export type visitActionType = "VISIT" | "OUT" | "";
export type visitAction = {
  type: visitActionType;
  payload: string;
};

function initVisitTime(): visitTimeType {
  const visitTimeState: visitTimeType = {
    visitTime: new Date(Date.now()).toISOString(),
    outTime: new Date(Date.now()).toISOString(),
  };
  return visitTimeState;
}
export default function visitTimeReducer(
  state: visitTimeType = initVisitTime(),
  action: visitAction
) {
  const inputTime = new Date(action.payload);
  const currentVisitTime = new Date(state.visitTime);
  const currentOutTime = new Date(state.outTime);

  if (action.type === "VISIT") {
    if (inputTime > currentOutTime) {
      const outTimeToReturn = new Date(action.payload);
      outTimeToReturn.setHours(outTimeToReturn.getHours() + 1);
      return {
        visitTime: inputTime.toISOString(),
        outTime: outTimeToReturn.toISOString(),
      };
    }
    return {
      ...state,
      visitTime: inputTime.toISOString(),
    };
  } else if (action.type === "OUT") {
    if (currentVisitTime > inputTime) {
      alert("퇴실 시간이 입실 시간보다 빠를 수 없습니다.");
      return { ...state };
    }
    return {
      ...state,
      outTime: inputTime.toISOString(),
    };
  } else {
    return { ...state };
  }
}
