import React from 'react';
import { render } from '@testing-library/react';
import Config from '../../config';

import VideoPlayer from './VideoPlayer';

jest.mock('../ListItem', () => (props) => <div data-testid="list-item" {...props} />);

let mockVideoId = "";
const mockVideoData = {
    channelTitle: '',
    publishedAt: '',
    title: ''
};

test('should render place holder text when video id is not valid', () => {
    const { getByTestId } = render(<VideoPlayer videoId={mockVideoId} videoData={mockVideoData} />);
    
    const placeHolderText = getByTestId('place-holder-text-wrapper');

    expect(placeHolderText).toBeDefined();
    expect(placeHolderText.textContent).toStrictEqual('Search for a video');
    expect(placeHolderText).toMatchSnapshot();
});

test('should render video player iframe when video id is valid', () => {
    mockVideoId = 'aTestId';

    const { getByTestId } = render(<VideoPlayer videoId={mockVideoId} videoData={mockVideoData} />);
    
    expect(getByTestId('video-player')).toBeDefined();
    expect(getByTestId('video-iframe').src).toStrictEqual(`${Config.EMBED_VIDEO_URL}aTestId`)
});

test('should render video title when video title prop is valid', () => {
    mockVideoData.title = 'aTestTitle';

    const { getByTestId } = render(<VideoPlayer videoId={mockVideoId} videoData={mockVideoData} />);
    
    expect(getByTestId('video-title')).toBeDefined();
    expect(getByTestId('video-title').textContent).toStrictEqual('aTestTitle');
});

test('should render channel details and date when publishedAt and channelTitle props are valid', () => {
    jest.resetAllMocks();
    mockVideoData.channelTitle = 'aChannelTestTitle';
    mockVideoData.publishedAt = '2021-11-12T22:18:07Z';

    const { getByTestId } = render(<VideoPlayer videoId={mockVideoId} videoData={mockVideoData} />);
    
    expect(getByTestId('list-item')).toBeDefined();
});
