import React from 'react';
import CreateAudioFile from '../components/create-audiofile.component.js';
import renderer from 'react-test-renderer';

it('Renders a snapshot', () => {
  const tree = renderer.create(<CreateAudioFile/>).toJSON();
  expect(tree).toMatchSnapshot();
});
