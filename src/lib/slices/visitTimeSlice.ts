import { createSelector, createSlice, current } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { PayloadAction } from "@reduxjs/toolkit";
import compareLocaleDateSame from "@/utils/compareLocaleDate";

export type visitTimeState = {
  isAdjustTimeActive: boolean;
  visitDateStr: string;
  outDateStr: string;
  visitHour: number;
  outHour: number;
};

function initVisitTime(): visitTimeState {
  const visitTimeState: visitTimeState = {
    isAdjustTimeActive: false,
    visitDateStr: new Date(Date.now()).toLocaleDateString("ko-KR"),
    outDateStr: new Date(Date.now()).toLocaleDateString("ko-KR"),
    visitHour: new Date(Date.now()).getHours(),
    outHour: new Date(Date.now()).getHours() + 1,
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
    setVisitDate(state, action: PayloadAction<string>) {
      state.visitDateStr = action.payload;
      state.outDateStr = action.payload;
    },
    setOutDate(state, action: PayloadAction<string>) {
      state.outDateStr = action.payload;
    },
    setVisitHour(state, action: PayloadAction<number>) {
      state.visitHour = action.payload;
    },
    setOutHour(state, action: PayloadAction<number>) {
      state.outHour = action.payload;
    },
  },
});

export const {
  toggleAdjustTime,
  setVisitDate,
  setOutDate,
  setVisitHour,
  setOutHour,
} = visitTimeSlice.actions;

export default visitTimeSlice.reducer;
//Selectors
const visitDateSelector: (state: RootState) => string = (state: RootState) =>
  state.visitTime.visitDateStr;

const outDateSelector: (state: RootState) => string = (state: RootState) =>
  state.visitTime.outDateStr;
const visitHourSelector: (state: RootState) => number = (state: RootState) =>
  state.visitTime.visitHour;
const outHourSelector: (state: RootState) => number = (state: RootState) =>
  state.visitTime.outHour;
export const visitTimeSelector = createSelector(
  [visitDateSelector, outDateSelector, visitHourSelector, outHourSelector],
  (
    visitDateStr: string,
    outDateStr: string,
    visitHour: number,
    outHour: number
  ) => {
    return {
      visitDate: new Date(visitDateStr),
      outDate: new Date(outDateStr),
      visitHour: visitHour,
      outHour: outHour,
    };
  }
);
export const isAdjustTimeActiveSelctor: (state: RootState) => boolean = (
  state: RootState
) => state.visitTime.isAdjustTimeActive;
