import { configureStore } from "@reduxjs/toolkit";
import visitTimeReducer from "./reducer";

export const makeStore = () => {
  return configureStore({
    reducer: visitTimeReducer,
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
