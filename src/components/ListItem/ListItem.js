import React from 'react';
import PropTypes from 'prop-types';
import { getPublishedDate } from '../../helpers/utils';

import './ListItem.style.css';

const ListItem = ({ listData }) => {

    return (
        <ul className="details-list" data-testid='details-list'>
            <li data-testid="channel-title">{listData?.channelTitle}</li>
            <li data-testid="published-date">{getPublishedDate(listData?.publishedAt)}</li>
        </ul>
    );
};

ListItem.propTypes = {
    channelTitle: PropTypes.string,
    publishedAt: PropTypes.string,
};

ListItem.defaultProps = {
    channelTitle: '',
    publishedAt: '',
};

export default ListItem;
