import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const visitTimeSelector: (state: RootState) => string = (
  state: RootState
) => state.visitTime.visitTime;
export const outTimeSelector: (state: RootState) => string = (
  state: RootState
) => state.visitTime.outTime;
export const isAdjustTimeActiveSelctor: (state: RootState) => boolean = (
  state: RootState
) => state.visitTime.isAdjustTimeActive;
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
