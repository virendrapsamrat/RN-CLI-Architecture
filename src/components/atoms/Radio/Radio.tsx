import React, {memo, useMemo, useCallback} from 'react';
import {Pressable, View, ViewStyle} from 'react-native';
import {useTheme} from '@app/providers/ThemeProvider';

export interface RadioProps {
  selected: boolean;
  onSelect: () => void;
  disabled?: boolean;
  accessibilityLabel?: string;
}

export const Radio = memo<RadioProps>(
  ({selected, onSelect, disabled = false, accessibilityLabel}) => {
    const {theme} = useTheme();

    const outerStyle = useMemo((): ViewStyle => {
      const size = theme.responsiveSizes.iconSize.sm + theme.spacing.xs;
      return {
        width: size,
        height: size,
        borderRadius: theme.radius.full,
        borderWidth: theme.borderWidth.medium,
        borderColor: selected ? theme.colors.primary : theme.colors.inputBorder,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: disabled ? theme.opacity.disabled : theme.opacity.full,
      };
    }, [theme, selected, disabled]);

    const innerStyle = useMemo((): ViewStyle => {
      const size = theme.responsiveSizes.iconSize.sm - theme.spacing.xs;
      return {
        width: size,
        height: size,
        borderRadius: theme.radius.full,
        backgroundColor: selected ? theme.colors.primary : 'transparent',
      };
    }, [theme, selected]);

    const handlePress = useCallback(() => {
      if (!disabled && !selected) {
        onSelect();
      }
    }, [disabled, selected, onSelect]);

    return (
      <Pressable
        onPress={handlePress}
        disabled={disabled}
        style={outerStyle}
        accessibilityRole="radio"
        accessibilityState={{selected, disabled}}
        accessibilityLabel={accessibilityLabel ?? 'Radio button'}>
        {selected && <View style={innerStyle} />}
      </Pressable>
    );
  },
);

Radio.displayName = 'Radio';
