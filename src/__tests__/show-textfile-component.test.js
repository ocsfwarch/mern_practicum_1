import React from 'react';
import TextFileList from '../components/show-textfilelist.component.js';
import renderer from 'react-test-renderer';

it('Renders a snapshot', () => {
  const match = {
    params:{email:"tpartcal@gmail.com"}
  };

  const tree = renderer.create(<TextFileList match={match}/>).toJSON();
  expect(tree).toMatchSnapshot();
});
