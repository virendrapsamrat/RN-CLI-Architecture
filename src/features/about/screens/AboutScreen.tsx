import React, {memo, useMemo} from 'react';
import {View, StyleSheet} from 'react-native';
import {useTheme} from '@app/providers/ThemeProvider';
import {MainTemplate} from '@components/templates/MainTemplate/MainTemplate';
import {Text} from '@components/atoms/Text/Text';
import {Card} from '@components/molecules/Card/Card';
import {Spacer} from '@components/atoms/Spacer/Spacer';
import {useAboutViewModel} from '@features/about/viewmodels/useAboutViewModel';

export const AboutScreen = memo(() => {
  const {theme} = useTheme();
  const {title, description, appName, appVersion, buildNumber, highlights} =
    useAboutViewModel();

  const versionLabel = useMemo(
    () => `Version ${appVersion} (${buildNumber})`,
    [appVersion, buildNumber],
  );

  return (
    <MainTemplate title={title}>
      <View style={[styles.content, {padding: theme.spacing.lg}]}>
        <Text variant="h2">{appName}</Text>
        <Spacer size="sm" />
        <Text variant="body" color={theme.colors.textSecondary}>
          {description}
        </Text>
        <Spacer size="md" />
        <Text variant="caption" color={theme.colors.textTertiary}>
          {versionLabel}
        </Text>
        <Spacer size="xl" />
        <Card>
          {highlights.map((highlight, index) => (
            <View key={highlight}>
              <Text variant="body">{`\u2022 ${highlight}`}</Text>
              {index < highlights.length - 1 && <Spacer size="sm" />}
            </View>
          ))}
        </Card>
      </View>
    </MainTemplate>
  );
});

AboutScreen.displayName = 'AboutScreen';

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
});
