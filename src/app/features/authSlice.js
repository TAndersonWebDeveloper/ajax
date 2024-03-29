import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
const user = JSON.parse(localStorage.getItem("user"));
const initialState = {
  user: user ? user : null,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
  isLoggedIn: user ? true : false,
};

export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (error) {
      const message = error.response.data || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    const message = error.response.data || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    return await authService.logout();
  } catch (error) {
    const message = error.response.data || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => ({
      ...state,
      isLoading: true,
    }));
    builder.addCase(register.fulfilled, (state, action) => ({
      ...state,
      isLoading: false,
      isSuccess: true,
      user: action.payload,
    }));
    builder.addCase(register.rejected, (state, action) => ({
      ...state,
      isLoading: false,
      isError: true,
      message: action.payload,
    }));
    // builder.addCase(logout.fulfilled, (state) => ({
    //   ...state,
    //   user: null,
    // }));
    builder.addCase(login.pending, (state) => ({
      ...state,
      isLoading: true,
    }));
    builder.addCase(login.fulfilled, (state, action) => ({
      ...state,
      isLoading: false,
      isSuccess: true,
      user: action.payload,
    }));
    builder.addCase(login.rejected, (state, action) => ({
      ...state,
      isLoading: false,
      isError: true,
      message: action.payload,
    }));
  },
});

export default authSlice.reducer;
