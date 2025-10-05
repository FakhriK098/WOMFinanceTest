import React, { useCallback, useEffect, useRef } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  View,
  useColorScheme,
  StyleSheet,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Text, Button, Fab, PokemonCard, EmptyList, Spacer } from '@components';
import { logout } from '@store/slices/authSlice';
import { RootState, AppDispatch } from '@store';
import { colors } from '@theme/colors';
import { spacing } from '@theme/spacing';
import { typography } from '@theme/typography';
import { fetchPokemons } from '@store/slices/pokemonSlice';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@typings/navigation';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const email = useSelector((s: RootState) => s.auth.email);
  const { items, loading, error, refreshing, nextUrl } = useSelector(
    (s: RootState) => s.pokemon,
  );
  const isDark = useColorScheme() === 'dark';
  const listContentStyle = styles.listContent;
  const columnWrapperStyle = styles.columnWrapper;

  useEffect(() => {
    dispatch(fetchPokemons({ reset: true }));
  }, [dispatch]);

  const onRefresh = useCallback(() => {
    dispatch(fetchPokemons({ reset: true }));
  }, [dispatch]);

  const renderItem = useCallback(
    ({ item }: { item: (typeof items)[number] }) => (
      <PokemonCard
        item={item}
        onPress={() => navigation.navigate('Detail', { id: item.id })}
      />
    ),
    [navigation],
  );

  const renderHeader = useCallback(() => {
    return (
      <View style={styles.header}>
        <Text
          size={typography.lg}
          weight="bold"
          color={isDark ? colors.text.dark : colors.text.light}
        >
          {`Email: ${email}`}
        </Text>
      </View>
    );
  }, [email, isDark]);
  const keyExtractor = useCallback(
    (it: (typeof items)[number]) => String(it.id),
    [],
  );

  const loadMore = useCallback(() => {
    if (!loading && !refreshing && nextUrl) {
      dispatch(fetchPokemons({ reset: false }));
    }
  }, [loading, refreshing, nextUrl, dispatch]);

  const debouncedLoadMore = useCallback(() => {
    if (debounceRef.current) return;
    debounceRef.current = setTimeout(() => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
        debounceRef.current = null;
      }
      loadMore();
    }, 300);
  }, [loadMore]);

  const confirmLogout = useCallback(() => {
    Alert.alert(
      'Konfirmasi Logout',
      'Apakah Anda yakin ingin keluar?',
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Keluar',
          style: 'destructive',
          onPress: () => dispatch(logout()),
        },
      ],
      { cancelable: true },
    );
  }, [dispatch]);

  if (loading && items.length === 0) {
    return (
      <SafeAreaView>
        <View
          style={[
            styles.center,
            {
              backgroundColor: isDark
                ? colors.background.dark
                : colors.background.light,
            },
          ]}
        >
          <ActivityIndicator size="large" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <View
        style={{
          backgroundColor: isDark
            ? colors.background.dark
            : colors.background.light,
        }}
      >
        {error ? (
          <View style={styles.errorWrap}>
            <Text
              size={typography.sm}
              color={isDark ? colors.text.mutedDark : colors.text.mutedLight}
            >
              {error}
            </Text>
            <Spacer size={spacing.lg} />
            <Button title="Coba Lagi" onPress={onRefresh} />
          </View>
        ) : (
          <FlatList
            data={items}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            numColumns={2}
            contentContainerStyle={listContentStyle}
            columnWrapperStyle={columnWrapperStyle}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              !loading && !refreshing ? (
                <EmptyList isDark={isDark} />
              ) : undefined
            }
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor={colors.primary}
              />
            }
            ListHeaderComponent={renderHeader}
            onEndReached={debouncedLoadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
              loading && items.length > 0 ? (
                <View style={styles.footer}>
                  <ActivityIndicator />
                </View>
              ) : null
            }
          />
        )}
        <Fab
          icon={require('@assets/logout.png')}
          onPress={confirmLogout}
          style={styles.fab}
          backgroundColor={isDark ? colors.inputBg.dark : colors.primary}
          tintColor={colors.white}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorWrap: {
    flex: 1,
    padding: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContent: {
    padding: spacing.lg,
  },
  columnWrapper: {
    gap: spacing.sm,
  },
  footer: {
    paddingVertical: spacing.lg,
  },
  fab: {
    position: 'absolute',
    right: spacing.lg,
    bottom: spacing.lg,
  },
  header: {
    paddingVertical: spacing.sm,
  },
});

export default HomeScreen;
