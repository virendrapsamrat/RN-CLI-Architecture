import React, {memo, useMemo} from 'react';
import {View, Pressable, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTheme} from '@app/providers/ThemeProvider';
import {Text} from '@components/atoms/Text/Text';
import {Avatar} from '@components/atoms/Avatar/Avatar';
import {Icon} from '@components/atoms/Icon/Icon';
import {SearchBar} from '@components/molecules/SearchBar/SearchBar';

export interface HomeHeaderProps {
  userName?: string;
  avatarUrl?: string;
  greeting?: string;
  searchValue?: string;
  onSearchChange?: (text: string) => void;
  onSearchClear?: () => void;
  onNotificationPress?: () => void;
  onProfilePress?: () => void;
}

export const HomeHeader = memo<HomeHeaderProps>(
  ({
    userName = 'Guest',
    avatarUrl,
    greeting = 'Welcome back',
    searchValue = '',
    onSearchChange,
    onSearchClear,
    onNotificationPress,
    onProfilePress,
  }) => {
    const {theme} = useTheme();
    const insets = useSafeAreaInsets();

    const containerStyle = useMemo(
      () => ({
        paddingTop: insets.top + theme.spacing.md,
        paddingHorizontal: theme.spacing.lg,
        paddingBottom: theme.spacing.lg,
        backgroundColor: theme.colors.background,
        gap: theme.spacing.lg,
      }),
      [theme, insets.top],
    );

    const greetingStyle = useMemo(
      () => ({
        marginLeft: theme.spacing.md,
        flex: 1,
      }),
      [theme],
    );

    return (
      <View style={containerStyle} accessibilityRole="header">
        <View style={styles.topRow}>
          <Pressable
            onPress={onProfilePress}
            style={styles.profileSection}
            accessibilityRole="button"
            accessibilityLabel={`Profile, ${userName}`}>
            <Avatar uri={avatarUrl} name={userName} size="md" />
            <View style={greetingStyle}>
              <Text variant="caption" color={theme.colors.textSecondary}>
                {greeting}
              </Text>
              <Text variant="h3" numberOfLines={1}>
                {userName}
              </Text>
            </View>
          </Pressable>
          {onNotificationPress && (
            <Pressable
              onPress={onNotificationPress}
              accessibilityRole="button"
              accessibilityLabel="Notifications">
              <Icon
                name="notifications-outline"
                size={theme.responsiveSizes.iconSize.lg}
              />
            </Pressable>
          )}
        </View>
        {onSearchChange && (
          <SearchBar
            value={searchValue}
            onChangeText={onSearchChange}
            onClear={onSearchClear ?? (() => onSearchChange(''))}
          />
        )}
      </View>
    );
  },
);

HomeHeader.displayName = 'HomeHeader';

const styles = StyleSheet.create({
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
});
