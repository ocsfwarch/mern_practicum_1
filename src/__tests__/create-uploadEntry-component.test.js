import React from 'react';
import CreateTextFileList from '../components/create-uploadEntry.component.js';
import renderer from 'react-test-renderer';

it('Renders a snapshot', () => {
  const tree = renderer.create(<CreateTextFileList/>).toJSON();
  expect(tree).toMatchSnapshot();
});
