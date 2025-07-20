import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "./store";

export const visitTimeSelector: (state: RootState) => string = (
  state: RootState
) => state.visitTime;
export const outTimeSelector: (state: RootState) => string = (
  state: RootState
) => state.outTime;
export const VisitTimeSelector = createSelector(
  [visitTimeSelector, outTimeSelector],
  (visitTime: string, outTime: string) => {
    return {
      visitTime: new Date(visitTime),
      outTime: new Date(outTime),
    };
  }
);

export const currentTimeSelector = createSelector(
  [visitTimeSelector],
  (visitTime: string) => {
    return new Date(visitTime);
  }
);
