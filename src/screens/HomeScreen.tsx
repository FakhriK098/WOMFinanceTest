import React, { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  View,
  useColorScheme,
  StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Text from '../components/atoms/Text';
import Button from '../components/atoms/Button';
import Fab from '../components/atoms/Fab';
import { logout } from '../store/slices/authSlice';
import { RootState, AppDispatch } from '../store';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import Spacer from '../components/atoms/Spacer';
import { fetchPokemons } from '../store/slices/pokemonSlice';
import PokemonCard from '../components/molecules/PokemonCard';
import { useNavigation } from '@react-navigation/native';
import EmptyList from '../components/molecules/EmptyList';

const HomeScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const email = useSelector((s: RootState) => s.auth.email);
  const { items, loading, error, refreshing, nextUrl } = useSelector(
    (s: RootState) => s.pokemon,
  );
  const isDark = useColorScheme() === 'dark';
  const listContentStyle = styles.listContent;
  const columnWrapperStyle = styles.columnWrapper;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: email || 'Beranda',
      headerStyle: {
        backgroundColor: isDark
          ? colors.background.dark
          : colors.background.light,
      },
      headerTintColor: isDark ? colors.text.dark : colors.text.light,
    });
  }, [navigation, email, isDark]);

  useEffect(() => {
    dispatch(fetchPokemons({ reset: true }));
  }, [dispatch]);

  const onRefresh = useCallback(() => {
    dispatch(fetchPokemons({ reset: true }));
  }, [dispatch]);

  const renderItem = useCallback(
    ({ item }: { item: (typeof items)[number] }) => <PokemonCard item={item} />,
    [],
  );
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

  if (loading && items.length === 0) {
    return (
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
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDark
            ? colors.background.dark
            : colors.background.light,
        },
      ]}
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
            !loading && !refreshing ? <EmptyList isDark={isDark} /> : undefined
          }
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={colors.primary}
            />
          }
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
        icon={require('../assets/logout.png')}
        onPress={() => dispatch(logout())}
        style={styles.fab}
        backgroundColor={isDark ? colors.inputBg.dark : colors.primary}
        tintColor={colors.white}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
});

export default HomeScreen;
