import '@testing-library/jest-native/extend-expect';

jest.mock('react-native-gesture-handler', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const View = require('react-native').View;
  return {
    GestureHandlerRootView: View,
    Swipeable: View,
    DrawerLayout: View,
    State: {},
    PanGestureHandler: View,
    TapGestureHandler: View,
    NativeViewGestureHandler: View,
  };
});

jest.mock('react-native-keyboard-controller', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const View = require('react-native').View;
  return {
    KeyboardProvider: ({children}: {children: React.ReactNode}) => children,
    KeyboardAwareScrollView: View,
  };
});

jest.mock('@react-navigation/native', () => {
  const actual = jest.requireActual('@react-navigation/native');
  return {
    ...actual,
    NavigationContainer: ({children}: {children: React.ReactNode}) => children,
  };
});

jest.mock('react-native-toast-message', () => ({
  __esModule: true,
  default: () => null,
}));

jest.mock('@react-native-community/netinfo', () => ({
  __esModule: true,
  default: {
    addEventListener: jest.fn(() => jest.fn()),
    fetch: jest.fn(() => Promise.resolve({isConnected: true, isInternetReachable: true})),
  },
}));

jest.mock('react-native-reanimated', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

jest.mock('react-native-config', () => ({
  APP_NAME: 'RN-CLI-App',
  ENV: 'development',
  API_BASE_URL: 'https://dev-api.example.com',
  API_TIMEOUT: '30000',
  ENABLE_ANALYTICS: 'false',
  ENABLE_CRASH_REPORTING: 'false',
}));

jest.mock('react-native-localize', () => ({
  getLocales: () => [{languageCode: 'en', countryCode: 'US'}],
}));

jest.mock('react-native-device-info', () => ({
  getVersion: () => '1.0.0',
  getBuildNumber: () => '1',
}));

jest.mock('react-native-vector-icons/Ionicons', () => 'Icon');

jest.mock('react-native-mmkv', () => ({
  createMMKV: jest.fn(() => {
    const storage = new Map<string, string>();
    return {
      set: (key: string, value: string) => storage.set(key, value),
      getString: (key: string) => storage.get(key),
      remove: (key: string) => storage.delete(key),
      delete: (key: string) => storage.delete(key),
      clearAll: () => storage.clear(),
      contains: (key: string) => storage.has(key),
    };
  }),
}));
