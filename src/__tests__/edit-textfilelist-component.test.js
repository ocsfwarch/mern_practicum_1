import React from 'react';
import EditTextFileList from '../components/edit-textfilelist.component.js';
import renderer from 'react-test-renderer';

it('Renders a snapshot', () => {
  const match = {
    params:{id:"1234"}
  };

  const tree = renderer.create(<EditTextFileList match={match}/>).toJSON();
  expect(tree).toMatchSnapshot();
});
