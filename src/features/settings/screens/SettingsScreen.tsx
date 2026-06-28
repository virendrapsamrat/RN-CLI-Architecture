import React, {memo, useCallback, useMemo} from 'react';
import {View, StyleSheet} from 'react-native';
import {useTheme} from '@app/providers/ThemeProvider';
import {DashboardTemplate} from '@components/templates/DashboardTemplate/DashboardTemplate';
import {
  SettingsSection,
  SettingsItem,
} from '@components/organisms/SettingsSection/SettingsSection';
import {ListItem} from '@components/molecules/ListItem/ListItem';
import {Switch} from '@components/atoms/Switch/Switch';
import {Text} from '@components/atoms/Text/Text';
import {Spacer} from '@components/atoms/Spacer/Spacer';
import {Loader} from '@components/atoms/Loader/Loader';
import {useSettingsViewModel} from '@features/settings/viewmodels/useSettingsViewModel';

export const SettingsScreen = memo(() => {
  const {theme} = useTheme();
  const {
    title,
    isDarkMode,
    isBiometricEnabled,
    isLoggingOut,
    appearanceItems,
    securityItems,
    preferenceItems,
    accountItems,
    toggleTheme,
    toggleBiometric,
  } = useSettingsViewModel();

  const contentStyle = useMemo(
    () => ({
      paddingHorizontal: theme.spacing.lg,
      gap: theme.spacing.xl,
    }),
    [theme],
  );

  const renderSwitchItem = useCallback(
    (item: SettingsItem, value: boolean, onToggle: () => void) => (
      <View
        key={item.id}
        style={[styles.switchRow, {paddingHorizontal: theme.spacing.lg}]}
        accessibilityRole="none">
        <View style={styles.switchLabel}>
          <Text variant="body">{item.title}</Text>
          {item.subtitle && (
            <Text variant="caption" color={theme.colors.textSecondary}>
              {item.subtitle}
            </Text>
          )}
        </View>
        <Switch value={value} onValueChange={onToggle} accessibilityLabel={item.title} />
      </View>
    ),
    [theme],
  );

  const renderListItem = useCallback(
    (item: SettingsItem) => (
      <ListItem
        key={item.id}
        title={item.title}
        subtitle={item.subtitle}
        leftIcon={item.leftIcon}
        rightIcon={item.destructive ? undefined : 'chevron-forward'}
        destructive={item.destructive}
        onPress={item.onPress}
        showDivider
      />
    ),
    [],
  );

  if (isLoggingOut) {
    return (
      <DashboardTemplate title={title}>
        <Loader />
      </DashboardTemplate>
    );
  }

  return (
    <DashboardTemplate title={title}>
      <View style={contentStyle}>
        <SettingsSection
          title="Appearance"
          items={appearanceItems}
          renderItem={item => renderSwitchItem(item, isDarkMode, toggleTheme)}
        />
        <SettingsSection
          title="Security"
          items={securityItems}
          renderItem={item => renderSwitchItem(item, isBiometricEnabled, toggleBiometric)}
        />
        <SettingsSection
          title="Preferences"
          items={preferenceItems}
          renderItem={renderListItem}
        />
        <Spacer size="md" />
        <SettingsSection
          title="Account"
          items={accountItems}
          renderItem={renderListItem}
        />
      </View>
    </DashboardTemplate>
  );
});

SettingsScreen.displayName = 'SettingsScreen';

const styles = StyleSheet.create({
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  switchLabel: {
    flex: 1,
    marginRight: 12,
  },
});
