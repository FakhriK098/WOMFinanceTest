import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  View,
  PressableStateCallbackType,
} from 'react-native';
import Text from './Text';
import { colors } from '@theme/colors';
import { spacing } from '@theme/spacing';
import { radius } from '@theme/radius';
import { ButtonAtomProps } from '@typings/components';

const Button = ({
  title,
  loading,
  disabled,
  style,
  ...rest
}: ButtonAtomProps) => {
  const isDisabled = disabled || loading;
  const computedStyle = (state: PressableStateCallbackType) => {
    const propStyle = typeof style === 'function' ? style(state) : style;
    return [styles.base, isDisabled && styles.disabled, propStyle];
  };
  return (
    <Pressable
      accessibilityRole="button"
      style={computedStyle}
      disabled={isDisabled}
      {...rest}
    >
      <View style={styles.row}>
        {loading && (
          <ActivityIndicator
            color={colors.white}
            style={{ marginRight: spacing.sm }}
          />
        )}
        <Text color={colors.white} weight="bold">
          {title}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    alignItems: 'center',
  },
  disabled: {
    opacity: 0.6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default React.memo(Button);
