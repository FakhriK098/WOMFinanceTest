import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { useSelector, useDispatch } from 'react-redux';
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));
import * as RN from 'react-native';

// Mock navigation
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: jest.fn(), setOptions: jest.fn() }),
}));
jest.mock('@store', () => ({ store: {} }));
jest.mock('@store/slices/authSlice', () => ({ logout: () => ({ type: 'logout' }) }));
jest.mock('@store/slices/pokemonSlice', () => ({ fetchPokemons: () => ({ type: 'fetchPokemons' }) }));

import HomeScreen from '../HomeScreen';

describe('HomeScreen', () => {
  const useSelectorSpy = useSelector as unknown as jest.Mock;
  const useDispatchSpy = useDispatch as unknown as jest.Mock;

  beforeEach(() => {
    jest.spyOn(RN, 'useColorScheme').mockReturnValue('light');
    useDispatchSpy.mockReturnValue(jest.fn());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('shows initial loading state (snapshot)', () => {
    useSelectorSpy.mockImplementation((sel: any) =>
      sel({
        auth: { email: 'user@example.com' },
        pokemon: {
          items: [],
          loading: true,
          refreshing: false,
          error: null,
          nextUrl: null,
        },
      }),
    );
    let tr: renderer.ReactTestRenderer;
    act(() => {
      tr = renderer.create(<HomeScreen />);
    });
    expect(tr!.toJSON()).toMatchSnapshot();
    act(() => tr!.unmount());
  });

  it('renders error state with retry (snapshot)', () => {
    useSelectorSpy.mockImplementation((sel: any) =>
      sel({
        auth: { email: 'user@example.com' },
        pokemon: {
          items: [],
          loading: false,
          refreshing: false,
          error: 'Gagal memuat data',
          nextUrl: null,
        },
      }),
    );
    let tr: renderer.ReactTestRenderer;
    act(() => {
      tr = renderer.create(<HomeScreen />);
    });
    const json = tr!.toJSON();
    const hasRetry = (node: any): boolean => {
      if (!node) return false;
      if (typeof node === 'string') return node === 'Coba Lagi';
      const children = node.children || [];
      return Array.isArray(children) && children.some(hasRetry);
    };
    expect(hasRetry(json)).toBe(true);
    act(() => tr!.unmount());
  });
});
