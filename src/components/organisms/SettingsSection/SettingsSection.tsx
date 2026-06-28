import React, {memo, useMemo} from 'react';
import {View, StyleSheet} from 'react-native';
import {useTheme} from '@app/providers/ThemeProvider';
import {Text} from '@components/atoms/Text/Text';
import {Card} from '@components/molecules/Card/Card';

export interface SettingsItem {
  id: string;
  title: string;
  subtitle?: string;
  leftIcon?: string;
  rightIcon?: string;
  destructive?: boolean;
  onPress?: () => void;
}

export interface SettingsSectionProps {
  title?: string;
  items: SettingsItem[];
  renderItem: (item: SettingsItem, index: number) => React.ReactNode;
}

export const SettingsSection = memo<SettingsSectionProps>(
  ({title, items, renderItem}) => {
    const {theme} = useTheme();

    const headerStyle = useMemo(
      () => ({
        marginBottom: theme.spacing.sm,
        paddingHorizontal: theme.spacing.lg,
      }),
      [theme],
    );

    return (
      <View style={styles.section} accessibilityRole="list">
        {title && (
          <Text variant="label" color={theme.colors.textSecondary} style={headerStyle}>
            {title.toUpperCase()}
          </Text>
        )}
        <Card padded={false}>{items.map((item, index) => renderItem(item, index))}</Card>
      </View>
    );
  },
);

SettingsSection.displayName = 'SettingsSection';

const styles = StyleSheet.create({
  section: {
    width: '100%',
  },
});
