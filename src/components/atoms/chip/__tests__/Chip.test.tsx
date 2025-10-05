import React from 'react';
import renderer, { act } from 'react-test-renderer';

import Chip from '../Chip';

describe('Chip atom', () => {
  it('matches snapshot', () => {
    let tr: renderer.ReactTestRenderer;
    act(() => {
      tr = renderer.create(
        <Chip label="Fire" color="#f00" textColor="#fff" />,
      );
    });
    expect(tr!.toJSON()).toMatchSnapshot();
    act(() => tr!.unmount());
  });

  it('renders label text', () => {
    let tr: renderer.ReactTestRenderer;
    act(() => {
      tr = renderer.create(
        <Chip label="Fire" color="#f00" textColor="#fff" />,
      );
    });
    const json = tr!.toJSON();
    const hasText = (node: any): boolean => {
      if (!node) return false;
      if (typeof node === 'string') return node === 'Fire';
      const children = node.children || [];
      return Array.isArray(children) && children.some(hasText);
    };
    expect(hasText(json)).toBe(true);
    act(() => tr!.unmount());
  });

  it('applies background color style', () => {
    let tr: renderer.ReactTestRenderer;
    act(() => {
      tr = renderer.create(
        <Chip label="X" color="#123456" textColor="#fff" />,
      );
    });
    const wrapper = tr!.root.find((inst) => inst.props && inst.props.style);
    const style = wrapper.props.style as any[];
    const flattened = Array.isArray(style) ? style : [style];
    const hasBg = flattened.some((s) => s && s.backgroundColor === '#123456');
    expect(hasBg).toBe(true);
    act(() => tr!.unmount());
  });
});
