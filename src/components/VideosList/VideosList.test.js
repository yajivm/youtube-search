import React from 'react';
import { render } from '@testing-library/react';

import VideosList from './VideosList';

jest.mock('../VideoTile/VideoTile', () => (props) => <div data-testid="video-thumbnail" {...props} />);

let mockListData = [{ test: 'testData' }];
const mockOnVideoSelected = jest.fn();

test('should render video list component', () => {
    const { getByTestId } = render(<VideosList listData={mockListData} onVideoSelected={mockOnVideoSelected} />);
    
    const videoThumbnailWrapper = getByTestId('video-thumbnail-wrapper');

    expect(videoThumbnailWrapper).toBeDefined();
    expect(videoThumbnailWrapper).toMatchSnapshot();
});