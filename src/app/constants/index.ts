export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_PROFILE: 'user_profile',
  THEME_MODE: 'theme_mode',
  LANGUAGE: 'language',
  BIOMETRIC_ENABLED: 'biometric_enabled',
  SESSION_EXPIRY: 'session_expiry',
} as const;

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
    REFRESH: '/auth/refresh',
    FORGOT_PASSWORD: '/auth/forgot-password',
    VERIFY_OTP: '/auth/verify-otp',
    LOGOUT: '/auth/logout',
  },
  USER: {
    PROFILE: '/user/profile',
  },
} as const;

export const SESSION_TIMEOUT_MS = 30 * 60 * 1000;

export const NAVIGATION = {
  SPLASH: 'Splash',
  AUTH_STACK: 'AuthStack',
  MAIN_STACK: 'MainStack',
  LOGIN: 'Login',
  SIGNUP: 'Signup',
  FORGOT_PASSWORD: 'ForgotPassword',
  OTP: 'OTP',
  MAIN_TABS: 'MainTabs',
  HOME: 'Home',
  ABOUT: 'About',
  SETTINGS: 'Settings',
  PROFILE: 'Profile',
  MODAL_STACK: 'ModalStack',
} as const;
