import React from 'react';
import renderer, { act } from 'react-test-renderer';

import Section from '../Section';

describe('Section molecule', () => {
  it('matches snapshot and renders children', () => {
    let tr: renderer.ReactTestRenderer;
    act(() => {
      tr = renderer.create(
        <Section title="Stats" isDark={false}>
          <></>
        </Section>,
      );
    });
    expect(tr!.toJSON()).toMatchSnapshot();
    const title = tr!.root.find((inst) => inst.props && inst.props.children === 'Stats');
    expect(title).toBeTruthy();
    act(() => tr!.unmount());
  });
});

