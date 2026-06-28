import React, {memo, useMemo} from 'react';
import {Pressable, View, StyleSheet} from 'react-native';
import {useTheme} from '@app/providers/ThemeProvider';
import {Text} from '@components/atoms/Text/Text';
import {Avatar} from '@components/atoms/Avatar/Avatar';
import {Badge} from '@components/atoms/Badge/Badge';
import {Card} from '@components/molecules/Card/Card';

export interface ProfileCardProps {
  name: string;
  email?: string;
  avatarUrl?: string;
  badgeLabel?: string;
  onPress?: () => void;
}

export const ProfileCard = memo<ProfileCardProps>(
  ({name, email, avatarUrl, badgeLabel, onPress}) => {
    const {theme} = useTheme();

    const rowStyle = useMemo(
      () => ({
        flexDirection: 'row' as const,
        alignItems: 'center' as const,
        gap: theme.spacing.lg,
      }),
      [theme],
    );

    const nameRowStyle = useMemo(
      () => ({
        flexDirection: 'row' as const,
        alignItems: 'center' as const,
        gap: theme.spacing.sm,
      }),
      [theme],
    );

    const content = (
      <View style={rowStyle} accessibilityRole="summary">
        <Avatar uri={avatarUrl} name={name} size="lg" />
        <View style={styles.info}>
          <View style={nameRowStyle}>
            <Text variant="h3" numberOfLines={1} style={styles.name}>
              {name}
            </Text>
            {badgeLabel && <Badge label={badgeLabel} variant="primary" size="sm" />}
          </View>
          {email && (
            <Text
              variant="bodySmall"
              color={theme.colors.textSecondary}
              numberOfLines={1}>
              {email}
            </Text>
          )}
        </View>
      </View>
    );

    if (onPress) {
      return (
        <Pressable onPress={onPress} accessibilityRole="button">
          <Card>{content}</Card>
        </Pressable>
      );
    }

    return <Card>{content}</Card>;
  },
);

ProfileCard.displayName = 'ProfileCard';

const styles = StyleSheet.create({
  info: {
    flex: 1,
  },
  name: {
    flexShrink: 1,
  },
});
