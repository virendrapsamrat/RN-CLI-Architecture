import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NAVIGATION} from '@app/constants';
import {AuthStackParamList} from '@app/navigation/types';
import {LoginScreen} from '@features/auth/screens/LoginScreen';
import {SignupScreen} from '@features/auth/screens/SignupScreen';
import {ForgotPasswordScreen} from '@features/auth/screens/ForgotPasswordScreen';
import {OtpScreen} from '@features/auth/screens/OtpScreen';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name={NAVIGATION.LOGIN} component={LoginScreen} />
    <Stack.Screen name={NAVIGATION.SIGNUP} component={SignupScreen} />
    <Stack.Screen name={NAVIGATION.FORGOT_PASSWORD} component={ForgotPasswordScreen} />
    <Stack.Screen name={NAVIGATION.OTP} component={OtpScreen} />
  </Stack.Navigator>
);
