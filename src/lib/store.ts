import { configureStore } from "@reduxjs/toolkit";
import visitTimeReduer from "./slices/visitTimeSlice";
export const makeStore = () => {
  return configureStore({
    reducer: {
      visitTime: visitTimeReduer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
