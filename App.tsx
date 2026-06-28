import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import Toast from 'react-native-toast-message';
import {NavigationContainer} from '@react-navigation/native';
import {AppProviders} from '@app/providers/AppProviders';
import {ErrorBoundary} from '@app/providers/ErrorBoundary';
import {RootNavigator} from '@app/navigation/RootNavigator';
import {linking} from '@app/navigation/linking';
import {useTheme} from '@app/providers/ThemeProvider';
import {networkService} from '@app/services/networkService';
import {analyticsService} from '@app/analytics';
import {featureFlagService} from '@app/featureFlags';
import {useAppDispatch} from '@store/redux/hooks';
import {setOnlineStatus} from '@store/slices/appSlice';
import NetInfo from '@react-native-community/netinfo';

const AppContent: React.FC = () => {
  const {theme, mode} = useTheme();
  const dispatch = useAppDispatch();

  useEffect(() => {
    featureFlagService.loadRemoteFlags().catch(() => {});
    analyticsService.initialize('firebase');

    const unsubscribeNetwork = networkService.initialize();
    const unsubscribeNetInfo = NetInfo.addEventListener(state => {
      dispatch(setOnlineStatus(Boolean(state.isConnected && state.isInternetReachable)));
    });

    return () => {
      unsubscribeNetwork();
      unsubscribeNetInfo();
    };
  }, [dispatch]);

  return (
    <>
      <StatusBar
        barStyle={mode === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.background}
      />
      <NavigationContainer linking={linking}>
        <RootNavigator />
      </NavigationContainer>
      <Toast />
    </>
  );
};

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <AppProviders>
        <AppContent />
      </AppProviders>
    </ErrorBoundary>
  );
};

export default App;
