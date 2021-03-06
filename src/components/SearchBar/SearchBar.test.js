import React, { createRef } from 'react';
import { render, fireEvent, act } from '@testing-library/react';

import SearchBar from './SearchBar';

const mockSetClearSearchInputValue = jest.fn();
const mockOnSearch = jest.fn();
const mockRef = createRef();

test('should render SearchBar component', () => {
    const { getByTestId } = render(<SearchBar onSearch={mockOnSearch} searchInputRef={mockRef} />);
    
    const searchBarElement = getByTestId('search-input-wrapper');

    expect(searchBarElement).toBeDefined();
    expect(searchBarElement).toMatchSnapshot();
});

test('should mobile search bar when click enter keyboard', () => {
    const { getByTestId } = render(<SearchBar onSearch={mockOnSearch} searchInputRef={mockRef} />);
    
    const searchInput = getByTestId('video-search');
    
    expect(searchInput).toBeDefined();

    act(() => {
        fireEvent.change(searchInput, { target: { value: 'aTestWord' }});
    });

    expect(searchInput.value).toStrictEqual('aTestWord');

    fireEvent.submit(getByTestId('search-form'));

    expect(mockOnSearch).toHaveBeenCalledTimes(1);
    expect(mockOnSearch).toHaveBeenCalledWith('aTestWord');
});

test('should clear input value when click cross icon', () => {
    const { getByTestId } = render(<SearchBar onSearch={mockOnSearch} searchInputRef={mockRef} />);
    
    const searchInput = getByTestId('video-search');
    
    expect(searchInput).toBeDefined();

    act(() => {
        fireEvent.change(searchInput, { target: { value: 'aTestWord' }});
    });

    expect(searchInput.value).toStrictEqual('aTestWord');

    fireEvent.click(getByTestId('cross-icon'));

    expect(searchInput.value).toStrictEqual('');
});

test('should mobile search bar when enter data in input and click search icon', () => {
    jest.resetAllMocks();
    const { getByTestId } = render(<SearchBar onSearch={mockOnSearch} searchInputRef={mockRef} />);
    
    const searchInput = getByTestId('video-search');
    
    expect(searchInput).toBeDefined();

    act(() => {
        fireEvent.change(searchInput, { target: { value: 'aTestWord' }});
    });

    expect(searchInput.value).toStrictEqual('aTestWord');

    act(() => {
        fireEvent.click(getByTestId('search-button'));
    });

    expect(mockOnSearch).toHaveBeenCalledTimes(1);
    expect(mockOnSearch).toHaveBeenCalledWith('aTestWord');
});

test('should clear input value when canClearSearchInputValue prop is true', () => {
    mockSetClearSearchInputValue.mockReset();

    const { getByTestId } = render(
        <SearchBar
            onSearch={mockOnSearch}
            searchInputRef={mockRef}
            canClearSearchInputValue
            setClearSearchInputValue={mockSetClearSearchInputValue}
        />
    );
    
    const searchInput = getByTestId('video-search');
    
    expect(searchInput).toBeDefined();

    expect(mockSetClearSearchInputValue).toHaveBeenCalledWith(false);
    expect(searchInput.value).toStrictEqual('');
});

test('should not clear input value when canClearSearchInputValue prop is false', () => {
    mockSetClearSearchInputValue.mockReset();

    const { getByTestId } = render(
        <SearchBar
            onSearch={mockOnSearch}
            searchInputRef={mockRef}
            canClearSearchInputValue={false}
            setClearSearchInputValue={mockSetClearSearchInputValue}
        />
    );
    
    const searchInput = getByTestId('video-search');
    
    expect(searchInput).toBeDefined();

    expect(mockSetClearSearchInputValue).not.toHaveBeenCalled();
});

test('should not clear input value when canClearSearchInputValue prop is not passed', () => {
    mockSetClearSearchInputValue.mockReset();

    const { getByTestId } = render(
        <SearchBar
            onSearch={mockOnSearch}
            searchInputRef={mockRef}
            setClearSearchInputValue={mockSetClearSearchInputValue}
        />
    );
    
    const searchInput = getByTestId('video-search');
    
    expect(searchInput).toBeDefined();

    expect(mockSetClearSearchInputValue).not.toHaveBeenCalled();
});