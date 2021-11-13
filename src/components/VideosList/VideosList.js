import React from 'react';
import PropTypes from 'prop-types';
import VideoTile from '../VideoTile/VideoTile';

import './VideosList.style.css';

const VideosList = ({ listData, onVideoSelected, isThumbnailLayout }) => {

    const getVideosList = () => {
      if (listData?.length) {
        return listData.map((videoData, index) => {
          return (
            <div key={index} data-testid="video-thumbnail-wrapper" className={isThumbnailLayout ? 'thumbnail-wrapper' : 'video-wrapper'}>
              <VideoTile videoData={videoData} onSelectVideoTile={onVideoSelected} isThumbnailLayout={isThumbnailLayout} />
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
  isThumbnailLayout: PropTypes.bool,
};

VideosList.defaultProps = {
  isThumbnailLayout: false,
};

export default VideosList;
