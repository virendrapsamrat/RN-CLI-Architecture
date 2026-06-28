import {NavigatorScreenParams} from '@react-navigation/native';
import {NAVIGATION} from '@app/constants';

export type AuthStackParamList = {
  [NAVIGATION.LOGIN]: undefined;
  [NAVIGATION.SIGNUP]: undefined;
  [NAVIGATION.FORGOT_PASSWORD]: undefined;
  [NAVIGATION.OTP]: {email: string};
};

export type MainTabParamList = {
  [NAVIGATION.HOME]: undefined;
  [NAVIGATION.ABOUT]: undefined;
  [NAVIGATION.SETTINGS]: undefined;
  [NAVIGATION.PROFILE]: undefined;
};

export type MainStackParamList = {
  [NAVIGATION.MAIN_TABS]: NavigatorScreenParams<MainTabParamList>;
};

export type ModalStackParamList = {
  SessionExpired: undefined;
};

export type RootStackParamList = {
  [NAVIGATION.SPLASH]: undefined;
  [NAVIGATION.AUTH_STACK]: NavigatorScreenParams<AuthStackParamList>;
  [NAVIGATION.MAIN_STACK]: NavigatorScreenParams<MainStackParamList>;
  [NAVIGATION.MODAL_STACK]: NavigatorScreenParams<ModalStackParamList>;
};

declare module '@react-navigation/native' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface RootParamList extends RootStackParamList {}
}
