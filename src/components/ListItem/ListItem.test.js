import React from 'react';
import { render } from '@testing-library/react';

import ListItem from './ListItem';

const mockGetPublishedData = jest.fn();
jest.mock('../../helpers/utils', () => {
    return {
        getPublishedDate: (...args) => mockGetPublishedData(...args),
    }
});

const mockListData = {
    channelTitle: 'aChannelTestTitle',
    publishedAt: '2021-11-12T22:18:07Z',
};

test('should render list items', () => {
    const { getByTestId } = render(<ListItem listData={mockListData} />);
    
    expect(getByTestId('channel-title')).toBeDefined();
    expect(getByTestId('channel-title').textContent).toStrictEqual('aChannelTestTitle');
    expect(mockGetPublishedData).toHaveBeenCalledTimes(1);
    expect(mockGetPublishedData).toHaveBeenCalledWith('2021-11-12T22:18:07Z');
    expect(getByTestId('published-date')).toBeDefined();
    expect(getByTestId('details-list')).toMatchSnapshot();
});