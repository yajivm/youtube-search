import React from 'react';
import PropTypes from 'prop-types';
import Config from '../../config';

import ListItem from '../ListItem';

import './VideoPlayer.style.css';

const getVideoUrl = (videoId) => {
    return `${Config.EMBED_VIDEO_URL}${videoId}`;
};

const VideoPlayer = ({ videoId, videoData }) => {
    if (!videoId) {
        return (
            <div className="place-holder-text-wrapper" data-testid="place-holder-text-wrapper">
                Search for a video
            </div>
        );
    }

    return (
        <div className="video-player" data-testid="video-player">
            <iframe
                title={videoId}
                className="video-iframe"
                data-testid="video-iframe"
                src={getVideoUrl(videoId)}
            />
            {videoData?.title && <h3 className="title" data-testid="video-title">{videoData?.title}</h3>}
            {(videoData && Object.keys(videoData).length > 0) ?
                <ListItem listData={{
                    publishedAt: videoData?.publishedAt,
                    channelTitle: videoData?.channelTitle,
                }} />
            :
                <></>
            }
            {videoData?.description && <p className="description" data-testid="video-description">{videoData?.description}</p>}
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
