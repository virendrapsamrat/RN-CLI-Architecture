import React, {memo, useMemo} from 'react';
import {View, StyleSheet} from 'react-native';
import {useTheme} from '@app/providers/ThemeProvider';
import {Text} from '@components/atoms/Text/Text';
import {ProfileCard} from '@components/molecules/ProfileCard/ProfileCard';
import {Spacer} from '@components/atoms/Spacer/Spacer';

export interface ProfileStat {
  label: string;
  value: string;
}

export interface ProfileSectionProps {
  name: string;
  email?: string;
  avatarUrl?: string;
  badgeLabel?: string;
  stats?: ProfileStat[];
  onProfilePress?: () => void;
}

export const ProfileSection = memo<ProfileSectionProps>(
  ({name, email, avatarUrl, badgeLabel, stats = [], onProfilePress}) => {
    const {theme} = useTheme();

    const statsRowStyle = useMemo(
      () => ({
        flexDirection: 'row' as const,
        justifyContent: 'space-around' as const,
        paddingVertical: theme.spacing.lg,
      }),
      [theme],
    );

    return (
      <View style={styles.container} accessibilityRole="summary">
        <ProfileCard
          name={name}
          email={email}
          avatarUrl={avatarUrl}
          badgeLabel={badgeLabel}
          onPress={onProfilePress}
        />
        {stats.length > 0 && (
          <>
            <Spacer size="md" />
            <View style={statsRowStyle}>
              {stats.map(stat => (
                <View key={stat.label} style={styles.statItem} accessibilityRole="text">
                  <Text variant="h3">{stat.value}</Text>
                  <Text variant="caption" color={theme.colors.textSecondary}>
                    {stat.label}
                  </Text>
                </View>
              ))}
            </View>
          </>
        )}
      </View>
    );
  },
);

ProfileSection.displayName = 'ProfileSection';

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
});
