import React from 'react';
import renderer, { act } from 'react-test-renderer';

import InfoRow from '../InfoRow';

describe('InfoRow molecule', () => {
  it('matches snapshot and shows label/value', () => {
    let tr: renderer.ReactTestRenderer;
    act(() => {
      tr = renderer.create(<InfoRow label="Height" value={7} isDark={false} />);
    });
    expect(tr!.toJSON()).toMatchSnapshot();
    const label = tr!.root.find((inst) => inst.props && inst.props.children === 'Height');
    const value = tr!.root.find((inst) => inst.props && inst.props.children === '7');
    expect(label).toBeTruthy();
    expect(value).toBeTruthy();
    act(() => tr!.unmount());
  });
});

