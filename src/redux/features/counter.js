import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: {},
  isLoading: true,
  topService: {},
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
    setTopService: (state, action) => {
      state.topService = action.payload;
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
  setTopService,
} = counterSlice.actions;

export default counterSlice.reducer;
