import {useCallback, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {NAVIGATION} from '@app/constants';
import {authRepository} from '@features/auth/repository/AuthRepository';
import {SignupPayload} from '@domain/repositories/IAuthRepository';
import {AuthStackParamList} from '@app/navigation/types';
import {mapAxiosError} from '@shared/helpers/errorHandler';
import {useAppDispatch} from '@store/redux/hooks';
import {setAuthenticated} from '@store/slices/authSlice';

type AuthNavigationProp = NativeStackNavigationProp<AuthStackParamList>;

export interface SignupFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const useSignupViewModel = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<AuthNavigationProp>();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signup = useCallback(
    async (payload: SignupPayload) => {
      setIsLoading(true);
      setError(null);

      try {
        const session = await authRepository.signup(payload);
        dispatch(setAuthenticated({user: session.user}));
      } catch (err) {
        setError(mapAxiosError(err).message);
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch],
  );

  const navigateToLogin = useCallback(() => {
    navigation.navigate(NAVIGATION.LOGIN);
  }, [navigation]);

  return {
    signup,
    isLoading,
    error,
    navigateToLogin,
  };
};
