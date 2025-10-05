import React from 'react';
import renderer, { act } from 'react-test-renderer';

import LoginForm from '../LoginForm';

describe('LoginForm organism', () => {
  it('matches snapshot (initial) and disables submit', () => {
    const onSubmit = jest.fn();
    let tr: renderer.ReactTestRenderer;
    act(() => {
      tr = renderer.create(<LoginForm onSubmit={onSubmit} />);
    });
    expect(tr!.toJSON()).toMatchSnapshot();
    const button = tr!.root.find(
      (inst) => inst.props && inst.props.accessibilityRole === 'button',
    );
    expect(button.props.disabled).toBe(true);
    act(() => tr!.unmount());
  });

  it('enables submit when inputs valid and calls onSubmit', () => {
    const onSubmit = jest.fn();
    let tr: renderer.ReactTestRenderer;
    act(() => {
      tr = renderer.create(<LoginForm onSubmit={onSubmit} />);
    });
    const emailInput = tr!.root.find(
      (inst) => inst.props && inst.props.placeholder === 'nama@email.com',
    );
    const passwordInput = tr!.root.find(
      (inst) => inst.props && inst.props.placeholder === '••••••',
    );
    // Invalid email keeps disabled
    act(() => {
      emailInput.props.onChangeText('user');
      passwordInput.props.onChangeText('secret');
    });
    let button = tr!.root.find(
      (inst) => inst.props && inst.props.accessibilityRole === 'button',
    );
    expect(button.props.disabled).toBe(true);
    // Valid email + sufficient password length enables
    act(() => {
      emailInput.props.onChangeText('user@example.com');
      passwordInput.props.onChangeText('secret1');
    });
    button = tr!.root.find(
      (inst) => inst.props && inst.props.accessibilityRole === 'button',
    );
    expect(button.props.disabled).toBeFalsy();
    // Press submit
    act(() => {
      button.props.onPress();
    });
    expect(onSubmit).toHaveBeenCalledWith('user@example.com', 'secret1');
    act(() => tr!.unmount());
  });

  it('renders error text when error provided', () => {
    const onSubmit = jest.fn();
    let tr: renderer.ReactTestRenderer;
    act(() => {
      tr = renderer.create(<LoginForm onSubmit={onSubmit} error={'Failed'} />);
    });
    const error = tr!.root.find(
      (inst) => inst.props && inst.props.children === 'Failed',
    );
    expect(error).toBeTruthy();
    expect(tr!.toJSON()).toMatchSnapshot();
    act(() => tr!.unmount());
  });
});
