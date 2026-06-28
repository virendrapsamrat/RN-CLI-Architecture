import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {User} from '@domain/entities/User';
import {RootState} from '@store/redux/store';

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  sessionExpired: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  sessionExpired: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setAuthenticated(state, action: PayloadAction<{user: User}>) {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.sessionExpired = false;
      state.isLoading = false;
    },
    setUnauthenticated(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.isLoading = false;
    },
    setSessionExpired(state, action: PayloadAction<boolean>) {
      state.sessionExpired = action.payload;
      if (action.payload) {
        state.isAuthenticated = false;
        state.user = null;
      }
    },
    updateUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
  },
});

export const {
  setLoading,
  setAuthenticated,
  setUnauthenticated,
  setSessionExpired,
  updateUser,
} = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectCurrentUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;
