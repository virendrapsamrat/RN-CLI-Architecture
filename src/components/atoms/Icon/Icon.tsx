import React, {memo} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useTheme} from '@app/providers/ThemeProvider';

export interface IconProps {
  name: string;
  size?: number;
  color?: string;
  focused?: boolean;
}

export const Icon = memo<IconProps>(({name, size = 24, color, focused = false}) => {
  const {theme} = useTheme();
  const iconColor =
    color ?? (focused ? theme.colors.primary : theme.colors.textSecondary);

  return (
    <Ionicons name={name} size={size} color={iconColor} accessibilityElementsHidden />
  );
});

Icon.displayName = 'Icon';
