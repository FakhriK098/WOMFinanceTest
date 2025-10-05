import React from 'react';
import renderer, { act } from 'react-test-renderer';

import EmptyList from '../EmptyList';

describe('EmptyList molecule', () => {
  it('matches snapshot with default message', () => {
    let tr: renderer.ReactTestRenderer;
    act(() => {
      tr = renderer.create(<EmptyList isDark={false} />);
    });
    expect(tr!.toJSON()).toMatchSnapshot();
    const text = tr!.root.find((inst) => inst.props && inst.props.children === 'Belum ada data');
    expect(text).toBeTruthy();
    act(() => tr!.unmount());
  });

  it('renders custom message', () => {
    let tr: renderer.ReactTestRenderer;
    act(() => {
      tr = renderer.create(<EmptyList isDark={true} message="Nothing here" />);
    });
    const text = tr!.root.find((inst) => inst.props && inst.props.children === 'Nothing here');
    expect(text).toBeTruthy();
    act(() => tr!.unmount());
  });
});

