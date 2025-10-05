import React from 'react';
import renderer, { act } from 'react-test-renderer';

import Fab from '../Fab';

describe('Fab atom', () => {
  it('matches snapshot', () => {
    let tr: renderer.ReactTestRenderer;
    act(() => {
      tr = renderer.create(
        <Fab onPress={() => {}} icon={{ uri: 'icon' }} />,
      );
    });
    expect(tr!.toJSON()).toMatchSnapshot();
    act(() => tr!.unmount());
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    let tr: renderer.ReactTestRenderer;
    act(() => {
      tr = renderer.create(
        <Fab onPress={onPress} icon={{ uri: 'icon' }} />,
      );
    });
    const btn = tr!.root.find(
      (inst) => inst.props && inst.props.accessibilityRole === 'button',
    );
    act(() => {
      btn.props.onPress();
    });
    expect(onPress).toHaveBeenCalled();
    act(() => tr!.unmount());
  });

  it('applies background and tint colors', () => {
    let tr: renderer.ReactTestRenderer;
    act(() => {
      tr = renderer.create(
        <Fab
          onPress={() => {}}
          icon={{ uri: 'icon' }}
          backgroundColor="#abcdef"
          tintColor="#112233"
        />,
      );
    });
    const btn = tr!.root.find(
      (inst) => inst.props && inst.props.accessibilityRole === 'button',
    );
    const style = btn.props.style as any[];
    const flattened = Array.isArray(style) ? style : [style];
    expect(flattened.some((s) => s && s.backgroundColor === '#abcdef')).toBe(
      true,
    );
    const image = tr!.root.find((inst) => inst.props && inst.props.resizeMode);
    const imgStyle = image.props.style as any[];
    const imgFlattened = Array.isArray(imgStyle) ? imgStyle : [imgStyle];
    expect(
      imgFlattened.some((s) => s && s.tintColor === '#112233'),
    ).toBe(true);
    act(() => tr!.unmount());
  });
});
