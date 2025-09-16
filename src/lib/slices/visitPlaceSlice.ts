import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface visitPlaceState {
  query: string;
}

function initVisitPlace(): visitPlaceState {
  const state: visitPlaceState = {
    query: "서울 교대역",
  };
  return state;
}
const visitPlaceSlice = createSlice({
  name: "visitPlace",
  initialState: initVisitPlace,
  reducers: {
    setVisitPlace(state: visitPlaceState, action: PayloadAction<string>) {
      state.query = action.payload;
    },
  },
});

export const visitPlaceReducer = visitPlaceSlice.reducer;
export const { setVisitPlace } = visitPlaceSlice.actions;
const _visitPlaceSelector: (state: RootState) => string = (state: RootState) =>
  state.visitPlace.query;

export const visitPlaceSelector = createSelector(
  [_visitPlaceSelector],
  (query: string) => {
    return {
      query: query,
    };
  }
);
