import React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from '@components/atoms/text/Text';
import Input from '@components/atoms/input/Input';
import type { FormFieldProps } from '@typings/components';
import { colors } from '@theme/colors';
import { typography } from '@theme/typography';
import Spacer from '@components/atoms/spacer/Spacer';
import { spacing } from '@theme/spacing';

const FormField = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  errorText,
  keyboardType = 'default',
}: FormFieldProps) => {
  return (
    <View style={styles.container}>
      <Text size={typography.sm} color={colors.text.mutedLight}>
        {label}
      </Text>
      <Spacer size={spacing.sm} />
      <Input
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        error={Boolean(errorText)}
      />
      {!!errorText && (
        <Text
          size={typography.xs}
          color={colors.danger}
          style={styles.textError}
        >
          {errorText}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  textError: {
    marginTop: 6,
  },
});

export default React.memo(FormField);
