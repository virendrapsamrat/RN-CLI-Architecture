import React, {memo, useMemo, useCallback} from 'react';
import {View, Pressable, StyleSheet} from 'react-native';
import {useTheme} from '@app/providers/ThemeProvider';
import {Input} from '@components/atoms/Input/Input';
import {Icon} from '@components/atoms/Icon/Icon';

export interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onClear?: () => void;
}

export const SearchBar = memo<SearchBarProps>(
  ({value, onChangeText, placeholder = 'Search', onClear}) => {
    const {theme} = useTheme();

    const containerStyle = useMemo(
      () => ({
        flexDirection: 'row' as const,
        alignItems: 'center' as const,
        backgroundColor: theme.colors.surfaceSecondary,
        borderRadius: theme.radius.md,
        paddingHorizontal: theme.spacing.md,
        gap: theme.spacing.sm,
      }),
      [theme],
    );

    const handleClear = useCallback(() => {
      onClear?.();
    }, [onClear]);

    return (
      <View style={containerStyle} accessibilityRole="search">
        <Icon
          name="search"
          size={theme.responsiveSizes.iconSize.md}
          color={theme.colors.textTertiary}
        />
        <Input
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          style={styles.input}
          accessibilityLabel={placeholder}
        />
        {value.length > 0 && onClear && (
          <Pressable
            onPress={handleClear}
            accessibilityRole="button"
            accessibilityLabel="Clear search">
            <Icon
              name="close-circle"
              size={theme.responsiveSizes.iconSize.md}
              color={theme.colors.textTertiary}
            />
          </Pressable>
        )}
      </View>
    );
  },
);

SearchBar.displayName = 'SearchBar';

const styles = StyleSheet.create({
  input: {
    flex: 1,
    borderWidth: 0,
    backgroundColor: 'transparent',
    paddingHorizontal: 0,
  },
});
