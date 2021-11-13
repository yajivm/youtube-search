import React, { createRef } from 'react';
import { render, fireEvent } from '@testing-library/react';

import Header from './Header';

jest.mock('../SearchBar', () => (props) => <div data-testid="search-bar-component" {...props} />);

const mockOnSearch = jest.fn();
const mockRef = createRef();

test('should render header component', () => {
    const { getByTestId } = render(<Header onSearch={mockOnSearch} headerRef={mockRef} />);
    
    const headerElement = getByTestId('header');

    expect(headerElement).toBeDefined();
    expect(headerElement).toMatchSnapshot();
});

test('should mobile search bar when click search icon', () => {
    const { getByTestId, queryByTestId } = render(<Header onSearch={mockOnSearch} headerRef={mockRef} />);
    
    const searchIcon = getByTestId('responsive-search-button');

    expect(queryByTestId('mobile-search-bar')).toBeNull();
    expect(searchIcon).toBeDefined();

    fireEvent.click(searchIcon)

    expect(queryByTestId('mobile-search-bar')).toBeDefined();
    expect(searchIcon).toMatchSnapshot();
});