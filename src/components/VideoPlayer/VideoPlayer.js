import React from 'react';
import PropTypes from 'prop-types';
import { getPublishedDate } from '../../helpers/utils';
import Config from '../../config';

import './VideoPlayer.style.css';

const VideoPlayer = ({ videoId, videoData }) => {
    if (!videoId) {
        return (
            <div className="place-holder-text-wrapper" data-testid="place-holder-text-wrapper">
                Search for a video
            </div>
        );
    }

    const getVideoUrl = () => {
        return `${Config.EMBED_VIDEO_URL}${videoId}`;
    };

    const getVideoChannelDetails = () => {
        if (videoData && Object.keys(videoData).length > 0) {
            return (
                <ul className="details-list">
                    <li data-testid="channel-title">{videoData?.channelTitle}</li>
                    <li data-testid="published-date">{getPublishedDate(videoData?.publishedAt)}</li>
                </ul>
            )
        }
    };

    return (
        <div className="video-player" data-testid="video-player">
            <iframe
                title={videoId}
                className="video-iframe"
                data-testid="video-iframe"
                src={getVideoUrl()}
            />
            {videoData?.title && <h3 className="title" data-testid="video-title">{videoData?.title}</h3>}
            {getVideoChannelDetails()}
        </div>
    );
};

VideoPlayer.propTypes = {
    videoId: PropTypes.string,
    videoData: PropTypes.shape({}),
};

VideoPlayer.defaultProps = {
    videoId: null,
    title: null,
    channelDetails: {}
};

export default VideoPlayer;