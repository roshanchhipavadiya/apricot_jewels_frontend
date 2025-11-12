import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode"; // ✅ Correct way for Vite + ESModules


const token = localStorage.getItem("aprifrontoken");

const initialState = {
  token: token || null,
  user: token ? jwtDecode(token) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      state.user = jwtDecode(action.payload);
      localStorage.setItem("aprifrontoken", action.payload);
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("aprifrontoken");
    },
  },
});

export const { setToken, logout } = authSlice.actions;
export default authSlice.reducer;