import React from 'react';
import renderer, { act } from 'react-test-renderer';

import PokemonCard from '../PokemonCard';
import * as RN from 'react-native';

const item = {
  id: 1,
  name: 'Bulbasaur',
  image: 'http://img',
  types: ['grass', 'poison'],
  color: '#22c55e',
};

describe('PokemonCard molecule', () => {

  it('matches snapshot', () => {
    jest.spyOn(RN, 'useColorScheme').mockReturnValue('light');
    let tr: renderer.ReactTestRenderer;
    act(() => {
      tr = renderer.create(<PokemonCard item={item as any} />);
    });
    expect(tr!.toJSON()).toMatchSnapshot();
    act(() => tr!.unmount());
  });

  it('renders name, types and calls onPress', () => {
    jest.spyOn(RN, 'useColorScheme').mockReturnValue('light');
    const onPress = jest.fn();
    let tr: renderer.ReactTestRenderer;
    act(() => {
      tr = renderer.create(<PokemonCard item={item as any} onPress={onPress} />);
    });
    const nameNode = tr!.root.find(
      (inst) => inst.props && inst.props.children === 'Bulbasaur',
    );
    expect(nameNode).toBeTruthy();
    const typesNode = tr!.root.find(
      (inst) => inst.props && inst.props.children === 'grass • poison',
    );
    expect(typesNode).toBeTruthy();
    const pressable = tr!.root.find((inst) => inst.props && typeof inst.props.onPress === 'function');
    act(() => {
      pressable.props.onPress();
    });
    expect(onPress).toHaveBeenCalled();
    act(() => tr!.unmount());
  });
});
