import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { FlatList } from 'react-native';

import EvolutionList from '../EvolutionList';

const items = [
  { id: 1, name: 'Bulbasaur', image: 'http://img1' },
  { id: 2, name: 'Ivysaur', image: 'http://img2' },
  { id: 3, name: 'Venusaur', image: 'http://img3' },
];

describe('EvolutionList molecule', () => {
  it('matches snapshot', () => {
    let tr: renderer.ReactTestRenderer;
    act(() => {
      tr = renderer.create(
        <EvolutionList items={items as any} onPressItem={() => {}} />,
      );
    });
    expect(tr!.toJSON()).toMatchSnapshot();
    act(() => tr!.unmount());
  });

  it('calls onPressItem with id', () => {
    const onPress = jest.fn();
    let tr: renderer.ReactTestRenderer;
    act(() => {
      tr = renderer.create(
        <EvolutionList items={items as any} onPressItem={onPress} />,
      );
    });
    // Render a single item via FlatList's renderItem and trigger onPress
    const list = tr!.root.findByType(FlatList);
    const element = list.props.renderItem({ item: items[0], index: 0 });
    let itemRenderer: renderer.ReactTestRenderer;
    act(() => {
      itemRenderer = renderer.create(element);
    });
    const pressable = itemRenderer.root.find((inst) => inst.props && typeof inst.props.onPress === 'function');
    act(() => {
      pressable.props.onPress();
    });
    expect(onPress).toHaveBeenCalledWith(1);
    act(() => itemRenderer.unmount());
    act(() => tr!.unmount());
  });
});
