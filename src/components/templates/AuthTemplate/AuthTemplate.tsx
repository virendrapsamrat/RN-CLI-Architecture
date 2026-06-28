import React, {memo} from 'react';
import {KeyboardAvoidingView, Platform, ScrollView, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTheme} from '@app/providers/ThemeProvider';
import {Text} from '@components/atoms/Text/Text';
import {Spacer} from '@components/atoms/Spacer/Spacer';

export interface AuthTemplateProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export const AuthTemplate = memo<AuthTemplateProps>(
  ({title, subtitle, children, footer}) => {
    const {theme} = useTheme();
    const insets = useSafeAreaInsets();

    return (
      <KeyboardAvoidingView
        style={[styles.flex, {backgroundColor: theme.colors.background}]}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={[
            styles.content,
            {
              paddingTop: insets.top + theme.spacing.xl,
              paddingBottom: insets.bottom + theme.spacing.xl,
              paddingHorizontal: theme.spacing.xl,
            },
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <Text variant="h1">{title}</Text>
          {subtitle ? (
            <>
              <Spacer size="sm" />
              <Text variant="body" color={theme.colors.textSecondary}>
                {subtitle}
              </Text>
            </>
          ) : null}
          <Spacer size="xl" />
          {children}
          {footer ? (
            <>
              <Spacer size="lg" />
              {footer}
            </>
          ) : null}
        </ScrollView>
      </KeyboardAvoidingView>
    );
  },
);

AuthTemplate.displayName = 'AuthTemplate';

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
  },
});
