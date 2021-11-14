import React from 'react';
import PropTypes from 'prop-types';

import ListItem from '../ListItem';

import './VideoTile.style.css';

const VideoTile = ({ videoData, onSelectVideoTile, isThumbnailLayout }) => {
    const selectVideo = () => {
        onSelectVideoTile(videoData);
    };

    return (
        <div
            className={`video${isThumbnailLayout ? ' video-thumbnail' : ''}`}
            onClick={selectVideo}
            data-testid={`video${videoData?.id?.videoId}`}
        >
            <div className="video-image-wrapper">
                <img src={videoData?.snippet?.thumbnails?.high?.url} alt="videoTile" title={videoData?.snippet?.title} />
            </div>
            <div className="video-details">
                <p className="video-title" data-testid="video-title">{videoData?.snippet?.title}</p>
                {(videoData?.snippet && Object.keys(videoData?.snippet).length > 0) ?
                    <ListItem listData={{
                        publishedAt: videoData?.snippet?.publishedAt,
                        channelTitle: videoData?.snippet?.channelTitle,
                    }} />
                :
                    <></>
                }
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
    isThumbnailLayout: PropTypes.bool,
};

VideoTile.defaultProps = {
    isThumbnailLayout: false,
};

export default VideoTile;
