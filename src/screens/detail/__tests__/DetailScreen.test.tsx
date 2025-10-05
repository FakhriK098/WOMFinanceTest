import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { useSelector, useDispatch } from 'react-redux';
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));
import * as RN from 'react-native';

// Mock navigation + route
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ setOptions: jest.fn() }),
  useRoute: () => ({ params: { id: 1 } }),
}));
jest.mock('@store', () => ({ store: {} }));
jest.mock('@store/slices/pokemonDetailSlice', () => ({
  fetchPokemonDetail: () => ({ type: 'fetchDetail' }),
  clearDetail: () => ({ type: 'clearDetail' }),
}));

import DetailScreen from '../DetailScreen';

describe('DetailScreen', () => {
  const useSelectorSpy = useSelector as unknown as jest.Mock;
  const useDispatchSpy = useDispatch as unknown as jest.Mock;

  beforeEach(() => {
    jest.spyOn(RN, 'useColorScheme').mockReturnValue('light');
    useDispatchSpy.mockReturnValue(jest.fn());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('shows loading state (snapshot)', () => {
    useSelectorSpy.mockImplementation((sel: any) =>
      sel({ pokemonDetail: { data: null, loading: true, error: null } }),
    );
    let tr: renderer.ReactTestRenderer;
    act(() => {
      tr = renderer.create(<DetailScreen />);
    });
    expect(tr!.toJSON()).toMatchSnapshot();
    act(() => tr!.unmount());
  });

  it('shows error state (snapshot)', () => {
    useSelectorSpy.mockImplementation((sel: any) =>
      sel({ pokemonDetail: { data: null, loading: false, error: 'Error' } }),
    );
    let tr: renderer.ReactTestRenderer;
    act(() => {
      tr = renderer.create(<DetailScreen />);
    });
    expect(tr!.toJSON()).toMatchSnapshot();
    act(() => tr!.unmount());
  });

  it('renders detail content (snapshot)', () => {
    const data = {
      id: 1,
      name: 'bulbasaur',
      color: '#22c55e',
      image: 'http://img',
      types: ['grass', 'poison'],
      height: 7,
      weight: 69,
      base_experience: 64,
      abilities: ['overgrow', 'chlorophyll'],
      sprites: ['http://s1', 'http://s2'],
      evolutions: [
        { id: 2, name: 'ivysaur', image: 'http://img2' },
        { id: 3, name: 'venusaur', image: 'http://img3' },
      ],
    };
    useSelectorSpy.mockImplementation((sel: any) =>
      sel({ pokemonDetail: { data, loading: false, error: null } }),
    );
    let tr: renderer.ReactTestRenderer;
    act(() => {
      tr = renderer.create(<DetailScreen />);
    });
    expect(tr!.toJSON()).toMatchSnapshot();
    const nameNode = tr!.root.find(
      (inst) => inst.props && inst.props.children === 'bulbasaur',
    );
    expect(nameNode).toBeTruthy();
    act(() => tr!.unmount());
  });
});
