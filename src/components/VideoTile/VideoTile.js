import React from 'react';
import PropTypes from 'prop-types';
import { getPublishedDate } from '../../helpers/utils';

import './VideoTile.style.css';

const VideoTile = ({ videoData, onSelectVideoTile }) => {
    const selectVideo = () => {
        onSelectVideoTile(videoData);
    };

    const getVideoChannelDetails = () => {
        if (videoData && Object.keys(videoData?.snippet).length > 0) {
            return (
                <ul className="details-list">
                    <li data-testid="channel-title">{videoData?.snippet?.channelTitle}</li>
                    <li data-testid="published-date">{getPublishedDate(videoData?.snippet?.publishedAt)}</li>
                </ul>
            )
        }
    };

    return (
        <div
            className="video"
            onClick={() => selectVideo()}
            data-testid={`video${videoData?.id?.videoId}`}
        >
            <div className="video-thumbnail">
                <img src={videoData?.snippet?.thumbnails?.high?.url} alt="videoTile" title={videoData?.snippet?.title} />
            </div>
            <div className="video-details">
                <p className="video-title" data-testid="video-title">{videoData?.snippet?.title}</p>
                {getVideoChannelDetails()}
            </div>
        </div>
    );
};

VideoTile.propTypes = {
    videoData: PropTypes.shape({
        id: PropTypes.shape({
            videoId: PropTypes.string,
        }),
        snippet: PropTypes.shape(),
    }).isRequired,
    onSelectVideoTile: PropTypes.func.isRequired,
};

export default VideoTile;
