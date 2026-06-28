import React from 'react';
import {View, StyleSheet} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NAVIGATION} from '@app/constants';
import {
  MainStackParamList,
  ModalStackParamList,
  RootStackParamList,
} from '@app/navigation/types';
import {AuthStack} from '@app/navigation/AuthStack';
import {MainTabs} from '@app/navigation/MainTabs';
import {SplashScreen} from '@features/auth/screens/SplashScreen';
import {useAppSelector} from '@store/redux/hooks';
import {selectAuth, selectIsAuthenticated} from '@store/slices/authSlice';
import {useTheme} from '@app/providers/ThemeProvider';
import {Text} from '@components/atoms/Text/Text';

const RootStack = createNativeStackNavigator<RootStackParamList>();
const MainStackNavigator = createNativeStackNavigator<MainStackParamList>();
const ModalStackNavigator = createNativeStackNavigator<ModalStackParamList>();

const MainStack = () => (
  <MainStackNavigator.Navigator screenOptions={{headerShown: false}}>
    <MainStackNavigator.Screen name={NAVIGATION.MAIN_TABS} component={MainTabs} />
  </MainStackNavigator.Navigator>
);

const SessionExpiredModal = () => {
  const {theme} = useTheme();

  return (
    <View style={[styles.modal, {backgroundColor: theme.colors.surface}]}>
      <Text variant="h3">Session Expired</Text>
      <Text variant="body" color={theme.colors.textSecondary}>
        Please sign in again to continue.
      </Text>
    </View>
  );
};

const ModalStack = () => (
  <ModalStackNavigator.Navigator
    screenOptions={{
      presentation: 'modal',
      headerShown: false,
    }}>
    <ModalStackNavigator.Screen name="SessionExpired" component={SessionExpiredModal} />
  </ModalStackNavigator.Navigator>
);

const RootNavigatorContent = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const {isLoading, sessionExpired} = useAppSelector(selectAuth);

  return (
    <RootStack.Navigator screenOptions={{headerShown: false}}>
      {isLoading ? (
        <RootStack.Screen name={NAVIGATION.SPLASH} component={SplashScreen} />
      ) : isAuthenticated ? (
        <>
          <RootStack.Screen name={NAVIGATION.MAIN_STACK} component={MainStack} />
          {sessionExpired ? (
            <RootStack.Group screenOptions={{presentation: 'modal'}}>
              <RootStack.Screen name={NAVIGATION.MODAL_STACK} component={ModalStack} />
            </RootStack.Group>
          ) : null}
        </>
      ) : (
        <RootStack.Screen name={NAVIGATION.AUTH_STACK} component={AuthStack} />
      )}
    </RootStack.Navigator>
  );
};

export const RootNavigator = () => <RootNavigatorContent />;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 12,
  },
});
