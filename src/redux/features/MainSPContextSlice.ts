/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

const mainData: any = {
  value: [],
  currentUserDetails: {
    id: "",
    name: "",
    email: "",
    role: "",
  },
  appDetails: {
    adminId: "",
  },
  ADGroupIDs: {},
  tenantDetails: {},
  isSuperAdmin: false,
};

const MainSPContext: any = createSlice({
  name: "MainSPContext",
  initialState: mainData,
  reducers: {
    setMainSPContext: (state, action) => {
      state.value = action?.payload;
    },
    setCurrentUserDetails: (state, payload) => {
      state.currentUserDetails = payload?.payload;
    },
    setAppDetails: (state, action) => {
      state.appDetails = action?.payload;
    },
    setADGroupIDs: (state, action) => {
      state.ADGroupIDs = action?.payload;
    },
    setTenantDetails: (state, action) => {
      state.tenantDetails = action?.payload;
    },
    setIsSuperAdmin: (state, action) => {
      state.isSuperAdmin = action?.payload;
    },
  },
});

export const {
  setMainSPContext,
  setCurrentUserDetails,
  setAppDetails,
  setADGroupIDs,
  setTenantDetails,
  setIsSuperAdmin,
} = MainSPContext.actions;
export default MainSPContext.reducer;
