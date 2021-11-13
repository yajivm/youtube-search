import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import VideoTile from './VideoTile';

const mockGetPublishedData = jest.fn();
jest.mock('../../helpers/utils', () => {
    return {
        getPublishedDate: args => mockGetPublishedData(args),
    }
});

let mockVideoData = {
    id: {
        videoId: 'aTestId',
    },
    snippet: {
        publishedAt: "2021-11-12T22:18:07Z",
        title: "aTestTitle",
        channelId: "aTestChannelId",
        thumbnails: {
            high: {
                url: "aTestUrl",
            }
        },
    }
};
const mockOnSelectedVideoTitle = jest.fn();

test('should render video tile component', () => {
    const { getByTestId } = render(<VideoTile videoData={mockVideoData} onSelectVideoTile={mockOnSelectedVideoTitle} />);
    
    const videoTileWrapper = getByTestId('videoaTestId');

    expect(videoTileWrapper).toBeDefined();
    expect(videoTileWrapper).toMatchSnapshot();
});

test('should render video title when video title prop is valid', () => {
    mockVideoData.snippet.title = 'aTestTitle';

    const { getByTestId } = render(<VideoTile videoData={mockVideoData} onSelectVideoTile={mockOnSelectedVideoTitle} />);
    
    expect(getByTestId('video-title')).toBeDefined();
    expect(getByTestId('video-title').textContent).toStrictEqual('aTestTitle');
});

test('should render channel details and date when publishedAt and channelTitle props are valid', () => {
    jest.resetAllMocks();
    mockVideoData.snippet.channelTitle = 'aChannelTestTitle';
    mockVideoData.snippet.publishedAt = '2021-11-12T22:18:07Z';

    const { getByTestId } = render(<VideoTile videoData={mockVideoData} onSelectVideoTile={mockOnSelectedVideoTitle} />);
    
    expect(getByTestId('channel-title')).toBeDefined();
    expect(getByTestId('channel-title').textContent).toStrictEqual('aChannelTestTitle');
    expect(mockGetPublishedData).toHaveBeenCalledTimes(1);
    expect(mockGetPublishedData).toHaveBeenCalledWith('2021-11-12T22:18:07Z');
    expect(getByTestId('published-date')).toBeDefined();
});

test('should call call back when click video tile', () => {
    jest.resetAllMocks();
    mockVideoData.snippet.channelTitle = 'aChannelTestTitle';
    mockVideoData.snippet.publishedAt = '2021-11-12T22:18:07Z';

    const { getByTestId } = render(<VideoTile videoData={mockVideoData} onSelectVideoTile={mockOnSelectedVideoTitle} />);
    
    const videoTileWrapper = getByTestId('videoaTestId');

    expect(videoTileWrapper).toBeDefined();

    fireEvent.click(videoTileWrapper);

    expect(mockOnSelectedVideoTitle).toHaveBeenCalledTimes(1);
    expect(mockOnSelectedVideoTitle).toHaveBeenCalledWith(mockVideoData);
});