import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  access: null,
  refresh: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.access = action.payload.access;
      state.refresh = action.payload.refresh;
    },
    setLogout: (state) => {
      state.user = null;
      state.access = null;
      state.refresh = null;
    },

  },
});

export const { setLogin, setLogout } = authSlice.actions;

export default authSlice.reducer;
