import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ThemeMode} from '@app/theme';
import {RootState} from '@store/redux/store';

export interface AppState {
  themeMode: ThemeMode;
  language: 'en' | 'es';
  isOnline: boolean;
}

const initialState: AppState = {
  themeMode: 'light',
  language: 'en',
  isOnline: true,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setThemeMode(state, action: PayloadAction<ThemeMode>) {
      state.themeMode = action.payload;
    },
    setLanguage(state, action: PayloadAction<'en' | 'es'>) {
      state.language = action.payload;
    },
    setOnlineStatus(state, action: PayloadAction<boolean>) {
      state.isOnline = action.payload;
    },
  },
});

export const {setThemeMode, setLanguage, setOnlineStatus} = appSlice.actions;
export const selectApp = (state: RootState) => state.app;
export const selectThemeMode = (state: RootState) => state.app.themeMode;

export default appSlice.reducer;
