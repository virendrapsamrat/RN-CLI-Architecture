import React, {memo, useMemo} from 'react';
import {Pressable, View, ViewStyle, StyleSheet} from 'react-native';
import {useTheme} from '@app/providers/ThemeProvider';
import {Text} from '@components/atoms/Text/Text';
import {Icon} from '@components/atoms/Icon/Icon';
import {Divider} from '@components/atoms/Divider/Divider';

export interface ListItemProps {
  title: string;
  subtitle?: string;
  leftIcon?: string;
  rightIcon?: string;
  showDivider?: boolean;
  destructive?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  onPress?: () => void;
  testID?: string;
}

export const ListItem = memo<ListItemProps>(
  ({
    title,
    subtitle,
    leftIcon,
    rightIcon = 'chevron-forward',
    showDivider = false,
    destructive = false,
    disabled,
    style,
    onPress,
    testID,
  }) => {
    const {theme} = useTheme();

    const titleColor = destructive ? theme.colors.error : theme.colors.text;
    const subtitleColor = theme.colors.textSecondary;

    const containerStyle = useMemo(
      () => ({
        flexDirection: 'row' as const,
        alignItems: 'center' as const,
        paddingVertical: theme.spacing.md,
        paddingHorizontal: theme.spacing.lg,
        gap: theme.spacing.md,
        opacity: disabled ? theme.opacity.disabled : theme.opacity.full,
      }),
      [theme, disabled],
    );

    return (
      <>
        <Pressable
          style={[containerStyle, style]}
          disabled={disabled}
          onPress={onPress}
          testID={testID}
          accessibilityRole="button"
          accessibilityLabel={subtitle ? `${title}, ${subtitle}` : title}>
          {leftIcon && (
            <Icon
              name={leftIcon}
              size={theme.responsiveSizes.iconSize.md}
              color={titleColor}
            />
          )}
          <View style={styles.content}>
            <Text variant="body" color={titleColor} numberOfLines={1}>
              {title}
            </Text>
            {subtitle && (
              <Text variant="bodySmall" color={subtitleColor} numberOfLines={2}>
                {subtitle}
              </Text>
            )}
          </View>
          {rightIcon && (
            <Icon
              name={rightIcon}
              size={theme.responsiveSizes.iconSize.sm}
              color={theme.colors.textTertiary}
            />
          )}
        </Pressable>
        {showDivider && <Divider spacing={theme.spacing.none} />}
      </>
    );
  },
);

ListItem.displayName = 'ListItem';

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
});
