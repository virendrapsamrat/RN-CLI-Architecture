import React, {memo} from 'react';
import {ActivityIndicator, View, StyleSheet} from 'react-native';
import {useTheme} from '@app/providers/ThemeProvider';

export interface LoaderProps {
  size?: 'small' | 'large';
  fullScreen?: boolean;
}

export const Loader = memo<LoaderProps>(({size = 'large', fullScreen = false}) => {
  const {theme} = useTheme();

  return (
    <View
      style={[fullScreen && styles.fullScreen, !fullScreen && styles.inline]}
      accessibilityRole="progressbar"
      accessibilityLabel="Loading">
      <ActivityIndicator size={size} color={theme.colors.primary} />
    </View>
  );
});

Loader.displayName = 'Loader';

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inline: {
    padding: 16,
    alignItems: 'center',
  },
});
