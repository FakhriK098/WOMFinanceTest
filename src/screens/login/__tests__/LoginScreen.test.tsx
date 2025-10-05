import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { useSelector, useDispatch } from 'react-redux';
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));
import * as RN from 'react-native';

import LoginScreen from '../LoginScreen';
jest.mock('@store', () => ({ store: {} }));
jest.mock('@store/slices/authSlice', () => ({ login: () => ({ type: 'login' }) }));

describe('LoginScreen', () => {
  const useSelectorSpy = useSelector as unknown as jest.Mock;
  const useDispatchSpy = useDispatch as unknown as jest.Mock;

  beforeEach(() => {
    jest.spyOn(RN, 'useColorScheme').mockReturnValue('light');
    useDispatchSpy.mockReturnValue(jest.fn());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders template and form (snapshot)', () => {
    useSelectorSpy.mockImplementation((sel: any) =>
      sel({ auth: { loading: false, error: null } }),
    );
    let tr: renderer.ReactTestRenderer;
    act(() => {
      tr = renderer.create(<LoginScreen />);
    });
    expect(tr!.toJSON()).toMatchSnapshot();
    const subtitle = tr!.root.find(
      (inst) => inst.props && inst.props.children === 'Masuk untuk melanjutkan',
    );
    expect(subtitle).toBeTruthy();
    act(() => tr!.unmount());
  });
});
