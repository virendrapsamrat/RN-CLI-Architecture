import React from 'react';
import {StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {KeyboardProvider} from 'react-native-keyboard-controller';
import {store, persistor} from '@store/redux/store';
import {ThemeProvider} from '@app/providers/ThemeProvider';
import {Loader} from '@components/atoms/Loader/Loader';
import '@app/localization';

interface AppProvidersProps {
  children: React.ReactNode;
}

export const AppProviders: React.FC<AppProvidersProps> = ({children}) => {
  return (
    <GestureHandlerRootView style={styles.root}>
      <Provider store={store}>
        <PersistGate loading={<Loader fullScreen />} persistor={persistor}>
          <SafeAreaProvider>
            <KeyboardProvider>
              <ThemeProvider>{children}</ThemeProvider>
            </KeyboardProvider>
          </SafeAreaProvider>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
