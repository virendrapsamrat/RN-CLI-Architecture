import React, {memo, useMemo, useState, useCallback} from 'react';
import {View, Pressable, Modal, FlatList, StyleSheet} from 'react-native';
import {useTheme} from '@app/providers/ThemeProvider';
import {Text} from '@components/atoms/Text/Text';
import {Icon} from '@components/atoms/Icon/Icon';
import {ModalHeader} from '@components/molecules/ModalHeader/ModalHeader';

export interface DropdownOption {
  label: string;
  value: string;
}

export interface DropdownProps {
  label?: string;
  placeholder?: string;
  options: DropdownOption[];
  value?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  error?: string;
}

export const Dropdown = memo<DropdownProps>(
  ({
    label,
    placeholder = 'Select an option',
    options,
    value,
    onChange,
    disabled = false,
    error,
  }) => {
    const {theme} = useTheme();
    const [open, setOpen] = useState(false);

    const selectedOption = useMemo(
      () => options.find(option => option.value === value),
      [options, value],
    );

    const triggerStyle = useMemo(
      () => ({
        flexDirection: 'row' as const,
        alignItems: 'center' as const,
        justifyContent: 'space-between' as const,
        backgroundColor: theme.colors.inputBackground,
        borderWidth: theme.borderWidth.thin,
        borderColor: error ? theme.colors.error : theme.colors.inputBorder,
        borderRadius: theme.radius.md,
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.md,
        opacity: disabled ? theme.opacity.disabled : theme.opacity.full,
      }),
      [theme, error, disabled],
    );

    const handleOpen = useCallback(() => {
      if (!disabled) {
        setOpen(true);
      }
    }, [disabled]);

    const handleClose = useCallback(() => {
      setOpen(false);
    }, []);

    const handleSelect = useCallback(
      (optionValue: string) => {
        onChange(optionValue);
        setOpen(false);
      },
      [onChange],
    );

    return (
      <View style={styles.container}>
        {label && (
          <Text variant="label" color={theme.colors.text}>
            {label}
          </Text>
        )}
        {label && <View style={{height: theme.spacing.xs}} />}
        <Pressable
          onPress={handleOpen}
          style={triggerStyle}
          disabled={disabled}
          accessibilityRole="button"
          accessibilityLabel={label ?? placeholder}
          accessibilityState={{expanded: open}}>
          <Text
            variant="body"
            color={selectedOption ? theme.colors.text : theme.colors.placeholder}
            numberOfLines={1}
            style={styles.selectedText}>
            {selectedOption?.label ?? placeholder}
          </Text>
          <Icon name="chevron-down" size={theme.responsiveSizes.iconSize.sm} />
        </Pressable>
        {error && (
          <>
            <View style={{height: theme.spacing.xs}} />
            <Text variant="caption" color={theme.colors.error}>
              {error}
            </Text>
          </>
        )}

        <Modal
          visible={open}
          transparent
          animationType="fade"
          onRequestClose={handleClose}>
          <Pressable
            style={[styles.overlay, {backgroundColor: theme.colors.overlay}]}
            onPress={handleClose}>
            <View
              style={[
                styles.sheet,
                {
                  backgroundColor: theme.colors.card,
                  borderRadius: theme.radius.lg,
                  marginHorizontal: theme.spacing.lg,
                },
              ]}>
              <ModalHeader title={label ?? placeholder} onClose={handleClose} />
              <FlatList
                data={options}
                keyExtractor={item => item.value}
                renderItem={({item}) => (
                  <Pressable
                    onPress={() => handleSelect(item.value)}
                    style={{
                      paddingHorizontal: theme.spacing.lg,
                      paddingVertical: theme.spacing.md,
                      backgroundColor:
                        item.value === value
                          ? theme.colors.primaryLight
                          : theme.colors.card,
                    }}
                    accessibilityRole="menuitem"
                    accessibilityState={{selected: item.value === value}}>
                    <Text
                      variant="body"
                      color={
                        item.value === value ? theme.colors.primary : theme.colors.text
                      }>
                      {item.label}
                    </Text>
                  </Pressable>
                )}
              />
            </View>
          </Pressable>
        </Modal>
      </View>
    );
  },
);

Dropdown.displayName = 'Dropdown';

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  selectedText: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
  },
  sheet: {
    maxHeight: '60%',
    overflow: 'hidden',
  },
});
