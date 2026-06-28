import {LinkingOptions} from '@react-navigation/native';
import {NAVIGATION} from '@app/constants';
import {RootStackParamList} from '@app/navigation/types';

const prefixes = ['rncliapp://', 'https://rncliapp.com'];

export const linking: LinkingOptions<RootStackParamList> = {
  prefixes,
  config: {
    screens: {
      [NAVIGATION.SPLASH]: 'splash',
      [NAVIGATION.AUTH_STACK]: {
        screens: {
          [NAVIGATION.LOGIN]: 'login',
          [NAVIGATION.SIGNUP]: 'signup',
          [NAVIGATION.FORGOT_PASSWORD]: 'forgot-password',
          [NAVIGATION.OTP]: 'otp/:email',
        },
      },
      [NAVIGATION.MAIN_STACK]: {
        screens: {
          [NAVIGATION.MAIN_TABS]: {
            screens: {
              [NAVIGATION.HOME]: 'home',
              [NAVIGATION.ABOUT]: 'about',
              [NAVIGATION.SETTINGS]: 'settings',
              [NAVIGATION.PROFILE]: 'profile',
            },
          },
        },
      },
      [NAVIGATION.MODAL_STACK]: {
        screens: {
          SessionExpired: 'session-expired',
        },
      },
    },
  },
};
