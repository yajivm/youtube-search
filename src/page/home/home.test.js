import React from 'react';
import { render, waitFor } from '@testing-library/react';

import Home from './home';

const mockScrollReachedBottom = jest.fn();
jest.mock('../../helpers/utils', () => {
    return {
        scrollReachedBottom: () => mockScrollReachedBottom(),
    }
});

jest.mock('../../components/Header', () => (props) => <div data-testid="header" {...props} />);
jest.mock('../../components/VideosList', () => (props) => <div data-testid="video-list" {...props} />);
jest.mock('../../components/VideoPlayer', () => (props) => <div data-testid="video-player" {...props} />);

const mockResponseData = {
    items: [
        {
            id: {
                videoId: 'aTestIdOne',
            },
            snippet: {
                publishedAt: "2021-11-12T22:18:07Z",
                title: "aTestTitleOne",
                channelId: "aTestChannelIdOne",
                thumbnails: {
                    high: {
                        url: "aTestUrlOne",
                    }
                },
            }
        },
        {
            id: {
                videoId: 'aTestIdTwo',
            },
            snippet: {
                publishedAt: "2021-11-12T22:18:07Z",
                title: "aTestTitleTwo",
                channelId: "aTestChannelIdTwo",
                thumbnails: {
                    high: {
                        url: "aTestUrlTwo",
                    }
                },
            }
        }
    ]
}

const mockGetVideoDetailsByKey = jest.fn();
jest.mock('../../services/youtube.service', () => {
    return {
        getVideoDetailsByKey: (...args) => mockGetVideoDetailsByKey(...args),
    }
});

test('should render header component', async () => {
    mockGetVideoDetailsByKey.mockResolvedValueOnce({ data: mockResponseData });
    const { getByTestId } = await render(<Home />);

    const headerElement = getByTestId('header');

    expect(headerElement).toBeDefined();
});

test('should render video list component', async () => {
    mockGetVideoDetailsByKey.mockReset();
    mockGetVideoDetailsByKey.mockResolvedValueOnce({ data: mockResponseData });
    const { getByTestId } = render(<Home />);

    const videoListElement = getByTestId('video-list');

    expect(mockGetVideoDetailsByKey).toHaveBeenCalledTimes(1);
    expect(mockGetVideoDetailsByKey).toHaveBeenCalledWith('youtube', 30);
    expect(videoListElement).toBeDefined();
    expect(videoListElement).toMatchSnapshot();
});