import React, { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import FormField from '../molecules/FormField';
import Button from '../atoms/Button';
import Text from '../atoms/Text';
import type { LoginFormProps } from '../../types/components';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import Spacer from '../atoms/Spacer';

const LoginForm = ({ onSubmit, loading, error }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const emailError = useMemo(() => {
    if (!email) return null;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
      ? null
      : 'Email tidak valid';
  }, [email]);
  const passwordError = useMemo(() => {
    if (!password) return null;
    return password.length >= 6 ? null : 'Password minimal 6 karakter';
  }, [password]);
  const canSubmit =
    email.length > 0 && password.length > 0 && !emailError && !passwordError;

  return (
    <View style={styles.wrapper}>
      <FormField
        label="Email"
        placeholder="nama@email.com"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        errorText={emailError}
      />
      <Spacer size={spacing.lg} />
      <FormField
        label="Password"
        placeholder="••••••"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        errorText={passwordError}
      />
      <Spacer size={spacing.xl} />
      <Button
        title="Masuk"
        onPress={() => onSubmit(email, password)}
        disabled={!canSubmit}
        loading={loading}
      />
      {!!error && (
        <Text
          size={typography.sm}
          color={colors.danger}
          style={styles.textError}
        >
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  textError: {
    marginTop: spacing.sm,
    textAlign: 'center',
  },
});

export default React.memo(LoginForm);
