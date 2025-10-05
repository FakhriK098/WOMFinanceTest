import React from 'react';
import renderer, { act } from 'react-test-renderer';
import * as RN from 'react-native';

import AuthTemplate from '../AuthTemplate';

describe('AuthTemplate organism', () => {
  it('matches snapshot (light) and renders title/children', () => {
    jest.spyOn(RN, 'useColorScheme').mockReturnValue('light');
    let tr: renderer.ReactTestRenderer;
    act(() => {
      tr = renderer.create(
        <AuthTemplate title="Welcome">
          <></>
        </AuthTemplate>,
      );
    });
    expect(tr!.toJSON()).toMatchSnapshot();
    const title = tr!.root.find(
      (inst) => inst.props && inst.props.children === 'Welcome',
    );
    expect(title).toBeTruthy();
    act(() => tr!.unmount());
  });

  it('matches snapshot (dark)', () => {
    jest.spyOn(RN, 'useColorScheme').mockReturnValue('dark');
    let tr: renderer.ReactTestRenderer;
    act(() => {
      tr = renderer.create(
        <AuthTemplate title="Login">
          <></>
        </AuthTemplate>,
      );
    });
    expect(tr!.toJSON()).toMatchSnapshot();
    act(() => tr!.unmount());
  });
});

