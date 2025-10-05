import React from 'react';
import renderer, { act } from 'react-test-renderer';

import Input from '../Input';
import { colors } from '@theme/colors';

describe('Input atom', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('matches snapshot', () => {
    const RN = require('react-native');
    jest.spyOn(RN, 'useColorScheme').mockReturnValue('light');
    let tr: renderer.ReactTestRenderer;
    act(() => {
      tr = renderer.create(
        <Input value="" onChangeText={() => {}} placeholder="Type" />,
      );
    });
    expect(tr!.toJSON()).toMatchSnapshot();
    act(() => tr!.unmount());
  });

  it('propagates secureTextEntry', () => {
    const RN = require('react-native');
    jest.spyOn(RN, 'useColorScheme').mockReturnValue('light');
    let tr: renderer.ReactTestRenderer;
    act(() => {
      tr = renderer.create(<Input value="" onChangeText={() => {}} secureTextEntry />);
    });
    const ti = tr!.root.find((inst) => inst.props && inst.props.placeholderTextColor);
    expect(ti.props.secureTextEntry).toBe(true);
    act(() => tr!.unmount());
  });

  it('adds focused border color on focus', () => {
    const RN = require('react-native');
    jest.spyOn(RN, 'useColorScheme').mockReturnValue('light');
    let tr: renderer.ReactTestRenderer;
    act(() => {
      tr = renderer.create(<Input value="" onChangeText={() => {}} />);
    });
    const input = tr!.root.find((inst) => inst.props && typeof inst.props.onFocus === 'function');
    act(() => {
      input.props.onFocus({} as any);
    });
    const wrapper = tr!.root.find((inst) => inst.props && Array.isArray(inst.props.style));
    const style = wrapper.props.style as any[];
    const hasPrimary = style.some((s) => s && s.borderColor === colors.primary);
    expect(hasPrimary).toBe(true);
    act(() => tr!.unmount());
  });

  it('applies error border color when error=true', () => {
    const RN = require('react-native');
    jest.spyOn(RN, 'useColorScheme').mockReturnValue('light');
    let tr: renderer.ReactTestRenderer;
    act(() => {
      tr = renderer.create(<Input value="" onChangeText={() => {}} error />);
    });
    const wrapper = tr!.root.find((inst) => inst.props && Array.isArray(inst.props.style));
    const style = wrapper.props.style as any[];
    const hasDanger = style.some((s) => s && s.borderColor === colors.danger);
    expect(hasDanger).toBe(true);
    act(() => tr!.unmount());
  });
});
