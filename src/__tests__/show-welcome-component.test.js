import React from 'react';
import ShowWelcome from '../components/show-welcome.component.js';
import renderer from 'react-test-renderer';

it('Renders a snapshot', () => {
  const tree = renderer.create(<ShowWelcome/>).toJSON();
  expect(tree).toMatchSnapshot();
});
