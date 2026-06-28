import React, {memo} from 'react';
import {Switch as RNSwitch, SwitchProps as RNSwitchProps} from 'react-native';
import {useTheme} from '@app/providers/ThemeProvider';

export interface SwitchProps extends RNSwitchProps {
  label?: string;
}

export const Switch = memo<SwitchProps>(({disabled, ...props}) => {
  const {theme} = useTheme();

  return (
    <RNSwitch
      trackColor={{
        false: theme.colors.surfaceSecondary,
        true: theme.colors.primaryLight,
      }}
      thumbColor={props.value ? theme.colors.primary : theme.colors.textTertiary}
      ios_backgroundColor={theme.colors.surfaceSecondary}
      disabled={disabled}
      accessibilityRole="switch"
      {...props}
    />
  );
});

Switch.displayName = 'Switch';
