import { configureStore } from "@reduxjs/toolkit";
import visitTimeReduer from "./slices/visitTimeSlice";
import { visitPlaceReducer } from "./slices/visitPlaceSlice";
export const makeStore = () => {
  return configureStore({
    reducer: {
      visitTime: visitTimeReduer,
      visitPlace: visitPlaceReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
