import React, {memo, useMemo} from 'react';
import {View, StyleSheet} from 'react-native';
import {useTheme} from '@app/providers/ThemeProvider';
import {MainTemplate} from '@components/templates/MainTemplate/MainTemplate';
import {ProfileSection} from '@components/organisms/ProfileSection/ProfileSection';
import {Button} from '@components/atoms/Button/Button';
import {Spacer} from '@components/atoms/Spacer/Spacer';
import {useProfileViewModel} from '@features/settings/viewmodels/useProfileViewModel';

export const ProfileScreen = memo(() => {
  const {theme} = useTheme();
  const {
    title,
    editProfileLabel,
    name,
    email,
    avatarUrl,
    badgeLabel,
    stats,
    handleEditProfile,
  } = useProfileViewModel();

  const contentStyle = useMemo(
    () => ({
      padding: theme.spacing.lg,
    }),
    [theme],
  );

  return (
    <MainTemplate title={title}>
      <View style={[styles.content, contentStyle]}>
        <ProfileSection
          name={name}
          email={email}
          avatarUrl={avatarUrl}
          badgeLabel={badgeLabel}
          stats={stats}
          onProfilePress={handleEditProfile}
        />
        <Spacer size="xl" />
        <Button
          title={editProfileLabel}
          variant="outline"
          fullWidth
          onPress={handleEditProfile}
        />
      </View>
    </MainTemplate>
  );
});

ProfileScreen.displayName = 'ProfileScreen';

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
});
