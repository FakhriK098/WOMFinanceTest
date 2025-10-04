import React from 'react';
import { StyleSheet, View, useColorScheme } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Text from '../components/atoms/Text';
import Button from '../components/atoms/Button';
import { logout } from '../store/slices/authSlice';
import { RootState, AppDispatch } from '../store';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import Spacer from '../components/atoms/Spacer';

const HomeScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const email = useSelector((s: RootState) => s.auth.email);
  const isDark = useColorScheme() === 'dark';
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
      <Text
        weight="bold"
        size={typography.xl}
        color={isDark ? colors.text.dark : colors.text.light}
      >
        Pokedex
      </Text>
      <Spacer size={spacing.lg} />
      <Text
        size={typography.sm}
        color={isDark ? colors.text.dark : colors.text.light}
      >
        Masuk sebagai {email}
      </Text>
      <Spacer size={spacing.lg} />
      <Button title="Keluar" onPress={() => dispatch(logout())} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: spacing.lg,
    justifyContent: 'center',
  },
});

export default HomeScreen;
