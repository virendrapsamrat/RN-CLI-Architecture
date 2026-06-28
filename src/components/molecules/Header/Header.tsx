import React, {memo, useMemo} from 'react';
import {View, Pressable, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTheme} from '@app/providers/ThemeProvider';
import {Text} from '@components/atoms/Text/Text';
import {Icon} from '@components/atoms/Icon/Icon';

export interface HeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  onBackPress?: () => void;
  rightAction?: {
    icon: string;
    onPress: () => void;
    accessibilityLabel?: string;
  };
  transparent?: boolean;
}

export const Header = memo<HeaderProps>(
  ({
    title,
    subtitle,
    showBack = false,
    onBackPress,
    rightAction,
    transparent = false,
  }) => {
    const {theme} = useTheme();
    const insets = useSafeAreaInsets();

    const containerStyle = useMemo(
      () => ({
        paddingTop: insets.top + theme.spacing.sm,
        paddingBottom: theme.spacing.md,
        paddingHorizontal: theme.spacing.lg,
        backgroundColor: transparent ? 'transparent' : theme.colors.background,
        borderBottomWidth: transparent ? theme.borderWidth.none : theme.borderWidth.thin,
        borderBottomColor: theme.colors.border,
      }),
      [theme, insets.top, transparent],
    );

    const sideWidth = theme.responsiveSizes.iconSize.lg;

    return (
      <View style={containerStyle} accessibilityRole="header">
        <View style={styles.row}>
          {showBack && onBackPress ? (
            <Pressable
              onPress={onBackPress}
              style={{marginRight: theme.spacing.sm}}
              accessibilityRole="button"
              accessibilityLabel="Go back">
              <Icon name="arrow-back" size={theme.responsiveSizes.iconSize.md} />
            </Pressable>
          ) : (
            <View style={{width: sideWidth}} />
          )}

          <View style={styles.titleContainer}>
            <Text variant="h3" numberOfLines={1}>
              {title}
            </Text>
            {subtitle && (
              <Text
                variant="caption"
                color={theme.colors.textSecondary}
                numberOfLines={1}>
                {subtitle}
              </Text>
            )}
          </View>

          {rightAction ? (
            <Pressable
              onPress={rightAction.onPress}
              style={{marginLeft: theme.spacing.sm}}
              accessibilityRole="button"
              accessibilityLabel={rightAction.accessibilityLabel ?? 'Action'}>
              <Icon name={rightAction.icon} size={theme.responsiveSizes.iconSize.md} />
            </Pressable>
          ) : (
            <View style={{width: sideWidth}} />
          )}
        </View>
      </View>
    );
  },
);

Header.displayName = 'Header';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
