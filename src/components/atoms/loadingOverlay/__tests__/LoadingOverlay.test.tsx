import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { ActivityIndicator } from 'react-native';

import LoadingOverlay from '../LoadingOverlay';
import { colors } from '@theme/colors';

describe('LoadingOverlay atom', () => {
  it('matches snapshot', () => {
    let tr: renderer.ReactTestRenderer;
    act(() => {
      tr = renderer.create(<LoadingOverlay />);
    });
    expect(tr!.toJSON()).toMatchSnapshot();
    act(() => tr!.unmount());
  });

  it('renders activity indicator', () => {
    let tr: renderer.ReactTestRenderer;
    act(() => {
      tr = renderer.create(<LoadingOverlay />);
    });
    const loaders = tr!.root.findAllByType(ActivityIndicator);
    expect(loaders.length).toBe(1);
    act(() => tr!.unmount());
  });

  it('applies overlay background color', () => {
    let tr: renderer.ReactTestRenderer;
    act(() => {
      tr = renderer.create(<LoadingOverlay />);
    });
    const wrapper = tr!.root.find((inst) => inst.props && inst.props.style);
    const style = wrapper.props.style as any;
    const flattened = Array.isArray(style) ? style : [style];
    const hasOverlay = flattened.some(
      (s) => s && s.backgroundColor === colors.overlay,
    );
    expect(hasOverlay).toBe(true);
    act(() => tr!.unmount());
  });
});
