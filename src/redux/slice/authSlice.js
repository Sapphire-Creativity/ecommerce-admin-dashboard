import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { emailSignUp, emailSignIn, logout } from "../../services/authService";

export const signUp = createAsyncThunk(
  "auth/signUp",
  async ({ email, password, fullName }, thunkAPI) => {
    try {
      const cred = await emailSignUp(email, password, fullName);
      return {
        uid: cred.user.uid,
        email: cred.user.email,
        displayName: cred.user.displayName,
      };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
//
export const signIn = createAsyncThunk(
  "auth/signIn",
  async ({ email, password }, thunkAPI) => {
    try {
      const cred = await emailSignIn(email, password);
      return {
        uid: cred.user.uid,
        email: cred.user.email,
        displayName: cred.user.displayName || null,
      };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const signOutThunk = createAsyncThunk("auth/signOut", async () => {
  await logout();
});

const slice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    status: "idle",
    signUpError: null,
    signInError: null,
    signOutError: null,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setRole(state, action) {
      if (state.user) state.user.role = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Sign up
      .addCase(signUp.pending, (state) => {
        state.status = "loading";
        state.signUpError = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.status = "failed";
        state.signUpError = action.payload;
      })
      //
      // Sign In
      .addCase(signIn.pending, (state) => {
        state.status = "loading";
        state.signInError = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.status = "failed";
        state.signInError = action.payload;
      })

      // Sign out
      .addCase(signOutThunk.fulfilled, (state) => {
        state.user = null;
        state.status = "idle";
        state.signOutError = null;
      });
  },
});

export const { setUser, setRole } = slice.actions;
export default slice.reducer;
