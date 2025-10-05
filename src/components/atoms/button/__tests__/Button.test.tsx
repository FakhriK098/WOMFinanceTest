import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { ActivityIndicator } from 'react-native';

import Button from '../Button';

describe('Button atom', () => {
  it('matches snapshot (default)', () => {
    let tr: renderer.ReactTestRenderer;
    act(() => {
      tr = renderer.create(<Button title="Snapshot" />);
    });
    expect(tr!.toJSON()).toMatchSnapshot();
    act(() => tr!.unmount());
  });

  it('renders the title text', () => {
    let testRenderer: renderer.ReactTestRenderer;
    act(() => {
      testRenderer = renderer.create(<Button title="Submit" />);
    });
    const json = testRenderer!.toJSON();
    const hasSubmit = (node: any): boolean => {
      if (!node) return false;
      if (typeof node === 'string') return node === 'Submit';
      const children = node.children || [];
      if (Array.isArray(children)) return children.some(hasSubmit);
      return false;
    };
    expect(hasSubmit(json)).toBe(true);
    act(() => {
      testRenderer!.unmount();
    });
  });

  it('disables when disabled prop is true', () => {
    let testRenderer: renderer.ReactTestRenderer;
    act(() => {
      testRenderer = renderer.create(<Button title="Tap" disabled />);
    });
    const pressable = testRenderer!.root.find(
      inst => inst.props && inst.props.accessibilityRole === 'button',
    );
    expect(pressable.props.disabled).toBe(true);
    act(() => {
      testRenderer!.unmount();
    });
  });

  it('shows loader and disables when loading', () => {
    let testRenderer: renderer.ReactTestRenderer;
    act(() => {
      testRenderer = renderer.create(<Button title="Loading" loading />);
    });
    // Snapshot when loading
    expect(testRenderer!.toJSON()).toMatchSnapshot();
    // ActivityIndicator should be present
    const loaders = testRenderer!.root.findAllByType(ActivityIndicator);
    expect(loaders.length).toBe(1);
    // Pressable should be disabled while loading
    const pressable = testRenderer!.root.find(
      inst => inst.props && inst.props.accessibilityRole === 'button',
    );
    expect(pressable.props.disabled).toBe(true);
    act(() => {
      testRenderer!.unmount();
    });
  });
});
