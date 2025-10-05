import React from 'react';
import renderer, { act } from 'react-test-renderer';

import SpriteGrid from '../SpriteGrid';

describe('SpriteGrid molecule', () => {
  it('matches snapshot and renders images', () => {
    const sprites = ['http://a', 'http://b', 'http://c'];
    let tr: renderer.ReactTestRenderer;
    act(() => {
      tr = renderer.create(<SpriteGrid sprites={sprites} />);
    });
    expect(tr!.toJSON()).toMatchSnapshot();
    const images = tr!.root.findAll((inst) => inst.type === 'Image');
    expect(images.length).toBe(3);
    act(() => tr!.unmount());
  });
});

