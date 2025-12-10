/* eslint-disable @typescript-eslint/no-explicit-any */
import { configureStore } from "@reduxjs/toolkit";
import MainSPContext from "../features/MainSPContextSlice";

const store: any = configureStore({
  reducer: {
    MainSPContext: MainSPContext,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export { store };
