import React, {memo, useCallback, useMemo} from 'react';
import {View, Pressable, StyleSheet} from 'react-native';
import {FlashList, ListRenderItem} from '@shopify/flash-list';
import {useTheme} from '@app/providers/ThemeProvider';
import {Text} from '@components/atoms/Text/Text';
import {Badge} from '@components/atoms/Badge/Badge';
import {Loader} from '@components/atoms/Loader/Loader';
import {Divider} from '@components/atoms/Divider/Divider';

export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read?: boolean;
  type?: 'info' | 'success' | 'warning' | 'error';
}

export interface NotificationListProps {
  notifications: Notification[];
  loading?: boolean;
  onNotificationPress?: (notification: Notification) => void;
  onMarkAllRead?: () => void;
}

export const NotificationList = memo<NotificationListProps>(
  ({notifications, loading = false, onNotificationPress, onMarkAllRead}) => {
    const {theme} = useTheme();

    const itemStyle = useMemo(
      () => (read: boolean) => ({
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.md,
        backgroundColor: read ? theme.colors.background : theme.colors.primaryLight,
      }),
      [theme],
    );

    const rowStyle = useMemo(
      () => ({
        flexDirection: 'row' as const,
        alignItems: 'flex-start' as const,
        gap: theme.spacing.md,
      }),
      [theme],
    );

    const emptyStyle = useMemo(
      () => ({
        textAlign: 'center' as const,
        paddingVertical: theme.spacing.xxl,
      }),
      [theme],
    );

    const badgeVariant = useCallback((type?: Notification['type']) => {
      switch (type) {
        case 'success':
          return 'success' as const;
        case 'warning':
          return 'warning' as const;
        case 'error':
          return 'error' as const;
        default:
          return 'info' as const;
      }
    }, []);

    const renderItem: ListRenderItem<Notification> = useCallback(
      ({item}) => (
        <Pressable
          onPress={() => onNotificationPress?.(item)}
          style={itemStyle(Boolean(item.read))}
          accessibilityRole="button"
          accessibilityLabel={`${item.title}, ${item.message}`}>
          <View style={rowStyle}>
            <View style={styles.content}>
              <Text variant="label" numberOfLines={1}>
                {item.title}
              </Text>
              <Text
                variant="bodySmall"
                color={theme.colors.textSecondary}
                numberOfLines={2}>
                {item.message}
              </Text>
              <Text variant="caption" color={theme.colors.textTertiary}>
                {item.timestamp}
              </Text>
            </View>
            {item.type && (
              <Badge label={item.type} variant={badgeVariant(item.type)} size="sm" />
            )}
          </View>
          <Divider spacing={theme.spacing.none} />
        </Pressable>
      ),
      [theme, itemStyle, rowStyle, onNotificationPress, badgeVariant],
    );

    const keyExtractor = useCallback((item: Notification) => item.id, []);

    const ListHeader = useMemo(() => {
      if (!onMarkAllRead) {
        return null;
      }
      return (
        <Pressable
          onPress={onMarkAllRead}
          style={{
            paddingHorizontal: theme.spacing.lg,
            paddingVertical: theme.spacing.sm,
          }}
          accessibilityRole="button"
          accessibilityLabel="Mark all as read">
          <Text variant="label" color={theme.colors.primary}>
            Mark all as read
          </Text>
        </Pressable>
      );
    }, [onMarkAllRead, theme]);

    if (loading) {
      return <Loader />;
    }

    return (
      <FlashList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListHeaderComponent={ListHeader}
        ListEmptyComponent={
          <Text variant="body" color={theme.colors.textSecondary} style={emptyStyle}>
            No notifications
          </Text>
        }
      />
    );
  },
);

NotificationList.displayName = 'NotificationList';

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
});
