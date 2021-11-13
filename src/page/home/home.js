import React, { useState, useEffect, useRef } from 'react';
import Header from '../../components/Header';
import VidesoList from '../../components/VideosList';
import VideoPlayer from '../../components/VideoPlayer';
import { scrollReachedBottom } from '../../helpers/utils';
import Config from '../../config';

import { getVideoDetailsByKey } from '../../services/youtube.service';

import './home.style.css';

const DEFAULT_SEARCH_KEY = 'youtube';
const { EXPECTED_RESULTS_COUNT } = Config;
let maxResultsCount = EXPECTED_RESULTS_COUNT;

const Home = () => {
    const [videosList, setVideosList] = useState([]);
    const [selectedVideoDetails, setSelectedVideoDetails] = useState(null);

    const searchInputRef = useRef();

    const onSearchVideosByKey = async key => {
        getVideoDetailsByKey(key, maxResultsCount)
            .then(({ data }) => {
                const { items } = data;
                if (items?.length !== 0) {
                    setVideosList(items);
                    console.log('items=====>', items);
                }
                console.log('maxResultsCount=====>', maxResultsCount);
                maxResultsCount = maxResultsCount + EXPECTED_RESULTS_COUNT;
            })
            .catch(err => {
                console.log('youtube search api err=====>', err.response);
            });
    };

    const onVideoSelected = videoData => {
        setSelectedVideoDetails(videoData);
    };

    useEffect(() => {
        onSearchVideosByKey(DEFAULT_SEARCH_KEY, maxResultsCount);
    }, []);

    const onScroll = () => {
        const isScrollReachedBottom = scrollReachedBottom();
        if (isScrollReachedBottom) {
            const searchKey = searchInputRef?.current?.getSearchKey();
            onSearchVideosByKey(searchKey);
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', onScroll, false)
        return () => window.removeEventListener('scroll', onScroll, false)
    }, [])

    return (
        <>
            <div className="page-content">
                <Header onSearch={onSearchVideosByKey} headerRef={searchInputRef} />
                {!selectedVideoDetails ?
                    <main className="list-without-video-player">
                        <VidesoList data-testid="video-list" listData={videosList} onVideoSelected={onVideoSelected} />
                    </main>
                :
                    <main className="list-with-video-player">
                        <VideoPlayer videoData={selectedVideoDetails?.snippet} videoId={selectedVideoDetails?.id?.videoId} />
                        {videosList.length > 0 ?
                            <div>
                                <VidesoList listData={videosList} onVideoSelected={onVideoSelected} isThumbnailLayout={true} />
                            </div>
                        :
                            <></>
                        }
                    </main>
                }
            </div>
        </>
    );
};

export default Home;