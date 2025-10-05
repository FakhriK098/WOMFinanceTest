import React from 'react';
import renderer, { act } from 'react-test-renderer';

import FormField from '../FormField';
import { colors } from '@theme/colors';

describe('FormField molecule', () => {
  it('matches snapshot (no error)', () => {
    let tr: renderer.ReactTestRenderer;
    act(() => {
      tr = renderer.create(
        <FormField
          label="Email"
          placeholder="Your email"
          value=""
          onChangeText={() => {}}
        />,
      );
    });
    expect(tr!.toJSON()).toMatchSnapshot();
    act(() => tr!.unmount());
  });

  it('renders error text and sets Input error', () => {
    let tr: renderer.ReactTestRenderer;
    act(() => {
      tr = renderer.create(
        <FormField
          label="Password"
          placeholder="Password"
          value=""
          onChangeText={() => {}}
          secureTextEntry
          errorText="Required"
        />,
      );
    });
    const errorTextNode = tr!.root.find(
      (inst) => inst.props && inst.props.children === 'Required',
    );
    expect(errorTextNode).toBeTruthy();
    // Verify that some wrapper within Input applies danger border when error is true
    const styledNodes = tr!.root.findAll((inst) => inst.props && inst.props.style);
    const hasDanger = styledNodes.some((inst) => {
      const style = inst.props.style as any;
      const arr = Array.isArray(style) ? style : [style];
      return arr.some((s) => s && s.borderColor === colors.danger);
    });
    expect(hasDanger).toBe(true);
    expect(tr!.toJSON()).toMatchSnapshot();
    act(() => tr!.unmount());
  });
});
