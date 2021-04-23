import React from 'react';
import { getByText, render } from '@testing-library/react';
import LocationMapPicker from './index.js';

const testProps = {
  dispatch: jest.fn(),
  location: { lat: 0, lng: 0 },
};

describe('When given an correct test props', () => {
  it('should render the form label on the page', () => {
    //act
    const { getByText } = render(<LocationMapPicker {...testProps} />);
    const actual = getByText('Pick your location');

    //assert
    expect(actual).toBeInTheDocument();
  });
});
