import React, { useState } from 'react';
import PropTypes from 'prop-types';

import SearchIcon from '../../assets/img/search.svg';
import Logo from '../../assets/img/logo.svg';
import UserIcon from '../../assets/img/user.svg'

import SearchBar from '../SearchBar';
import Config from '../../config';

import './Header.style.css';

const DEFAULT_SEARCH_KEY = 'Maze runner';
const { EXPECTED_RESULTS_COUNT } = Config;

const Header = ({ onSearch, headerRef }) => {
    const [showSearchBarForMobile, setShowSearchBarForMobile] = useState(false);
    const [clearSearchInputValue, setClearSearchInputValue] = useState(false);

    const onClickSearchIcon = () => {
        setShowSearchBarForMobile(!showSearchBarForMobile);
    };

    const onClickLogo = () => {
        setClearSearchInputValue(true);
        onSearch(DEFAULT_SEARCH_KEY, EXPECTED_RESULTS_COUNT);
    };

    return (
        <>
            <div className="header" data-testid="header">
                <div className="header-wrapper">
                    <div className="logo-wrapper" data-testid="logo" onClick={onClickLogo}>
                        <img src={Logo} alt="youtube" title="You Tube" className="logo" />
                    </div>
                    <div className="window-search-bar">
                        <SearchBar
                            onSearch={onSearch}
                            searchInputRef={headerRef}
                            canClearSearchInputValue={clearSearchInputValue}
                            setClearSearchInputValue={setClearSearchInputValue}
                        />
                    </div>
                    <div className="user-wrapper">
                        <button className="responsive-button search-button" data-testid="responsive-search-button" onClick={onClickSearchIcon}>
                            <img src={SearchIcon} alt="searchVideos" title="search" className="search-icon" />
                        </button>
                        <img src={UserIcon} alt="user" title="Test User" className="user-icon" />
                    </div>
                </div>
                {showSearchBarForMobile &&
                    <div className="mobile-search-bar" data-testid="mobile-search-bar">
                        <SearchBar
                            data-testid="searchbar"
                            onSearch={onSearch}
                            searchInputRef={headerRef}
                            canClearSearchInputValue={clearSearchInputValue}
                            setClearSearchInputValue={setClearSearchInputValue}
                        />
                    </div>
                }
            </div>
        </>
    );
};

Header.propTypes = {
    onSearch: PropTypes.func.isRequired,
    headerRef: PropTypes.shape({}),
};

Header.defaultProps = {
    headerRef: null,
};

export default Header;
