import React from 'react';
import PropTypes from 'prop-types';
import VideoTile from '../VideoTile/VideoTile';

import './VideosList.style.css';

const VideosList = ({ listData, onVideoSelected }) => {

    const getVideosList = () => {
      if (listData?.length) {
        return listData.map((videoData, index) => {
          return (
            <div key={index} data-testid="video-thumbnail-wrapper">
              <VideoTile videoData={videoData} onSelectVideoTile={onVideoSelected} />
            </div>
          );
        });
      } else {
        return <></>;
      }
    };

    return (
        <>{getVideosList()}</>
    );
};

VideosList.propTypes = {
  listData: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  onVideoSelected: PropTypes.func.isRequired,
};

export default VideosList;
