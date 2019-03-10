import React from 'react';
import ShowSearch from '../components/show-search.component.js';
import renderer from 'react-test-renderer';

it('Renders a snapshot', () => {
  const tree = renderer.create(<ShowSearch/>).toJSON();
  expect(tree).toMatchSnapshot();
});
