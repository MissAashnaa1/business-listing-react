import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: {},
  isLoading: true,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    toggleLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    login: (state) => {
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setIsAuthenticated,
  setUser,
  setIsLoading,
  login,
  logout,
  toggleLoading,
} = counterSlice.actions;

export default counterSlice.reducer;
