import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { PayloadAction } from "@reduxjs/toolkit";

export type visitTimeState = {
  isAdjustTimeActive: boolean;
  visitTime: string;
  outTime: string;
};

function initVisitTime(): visitTimeState {
  const visitTimeState: visitTimeState = {
    isAdjustTimeActive: false,
    visitTime: new Date(Date.now()).toISOString(),
    outTime: new Date(Date.now()).toISOString(),
  };
  return visitTimeState;
}

const visitTimeSlice = createSlice({
  name: "visitTime",
  initialState: initVisitTime(),
  reducers: {
    toggleAdjustTime(state) {
      state.isAdjustTimeActive = !state.isAdjustTimeActive;
    },
    setVisitTime(state, action: PayloadAction<string>) {
      const input = new Date(action.payload);
      const currentOut = new Date(state.outTime);
      if (input > currentOut) {
        const newOut = new Date(input);
        newOut.setHours(newOut.getHours() + 1);
        state.visitTime = input.toISOString();
        state.outTime = newOut.toISOString();
      } else {
        state.visitTime = input.toISOString();
      }
    },
    setOutTime(state, action: PayloadAction<string>) {
      const input = new Date(action.payload);
      const currentVisit = new Date(state.visitTime);
      if (currentVisit > input) {
        alert("퇴실 시간이 입실 시간보다 빠를 수 없습니다.");
        return;
      }
      state.outTime = input.toISOString();
    },
  },
});

export const { toggleAdjustTime, setVisitTime, setOutTime } =
  visitTimeSlice.actions;

export default visitTimeSlice.reducer;
