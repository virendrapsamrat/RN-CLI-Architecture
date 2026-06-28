import {useCallback, useState} from 'react';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {NAVIGATION} from '@app/constants';
import {authRepository} from '@features/auth/repository/AuthRepository';
import {AuthStackParamList} from '@app/navigation/types';
import {mapAxiosError} from '@shared/helpers/errorHandler';
import {useAppDispatch} from '@store/redux/hooks';
import {setAuthenticated} from '@store/slices/authSlice';

type OtpRouteProp = RouteProp<AuthStackParamList, typeof NAVIGATION.OTP>;
type AuthNavigationProp = NativeStackNavigationProp<AuthStackParamList>;

export interface OtpFormValues {
  otp: string;
}

export const useOtpViewModel = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<AuthNavigationProp>();
  const route = useRoute<OtpRouteProp>();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const email = route.params.email;

  const verifyOtp = useCallback(
    async (otp: string) => {
      setIsLoading(true);
      setError(null);

      try {
        const session = await authRepository.verifyOtp({email, otp});
        dispatch(setAuthenticated({user: session.user}));
      } catch (err) {
        setError(mapAxiosError(err).message);
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch, email],
  );

  const navigateToLogin = useCallback(() => {
    navigation.navigate(NAVIGATION.LOGIN);
  }, [navigation]);

  return {
    email,
    verifyOtp,
    isLoading,
    error,
    navigateToLogin,
  };
};
