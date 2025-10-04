import React, { useCallback } from 'react';
import { StyleSheet, View, useColorScheme } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AuthTemplate, LoginForm, Text, Spacer } from '@components';
import { AppDispatch, RootState } from '@store';
import { login } from '@store/slices/authSlice';
import { colors } from '@theme/colors';
import { spacing } from '@theme/spacing';
import { typography } from '@theme/typography';

const LoginScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((s: RootState) => s.auth);
  const isDark = useColorScheme() === 'dark';
  const onSubmit = useCallback(
    (email: string, password: string) => {
      dispatch(login({ email, password }));
    },
    [dispatch],
  );
  return (
    <View
      style={[
        styles.wrapper,
        {
          backgroundColor: isDark
            ? colors.background.dark
            : colors.background.light,
        },
      ]}
    >
      <AuthTemplate title="Masuk">
        <Text
          size={typography.sm}
          color={isDark ? colors.text.mutedDark : colors.text.mutedLight}
        >
          Masuk untuk melanjutkan
        </Text>
        <Spacer size={spacing.lg} />
        <LoginForm onSubmit={onSubmit} loading={loading} error={error} />
      </AuthTemplate>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});

export default LoginScreen;
