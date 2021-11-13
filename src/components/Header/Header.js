import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SearchIcon from '../../assets/img/search.svg';
import Logo from '../../assets/img/logo.svg';
import UserIcon from '../../assets/img/user.svg'
import SearchBar from '../SearchBar';

import './Header.style.css';

const Header = ({ onSearch, headerRef }) => {
    const [showSearchBarForMobile, setShowSearchBarForMobile] = useState(false);

    const onClickSearchIcon = () => {
        setShowSearchBarForMobile(!showSearchBarForMobile);
    };

    return (
        <>
            <div className="header" data-testid="header">
                <div className="header-wrapper">
                    <div className="logo-wrapper">
                        <img src={Logo} alt="youtube" title="You Tube" className="logo" />
                    </div>
                    <div className="window-search-bar">
                        <SearchBar onSearch={onSearch} searchInputRef={headerRef} />
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
                        <SearchBar onSearch={onSearch} data-testid="searchbar" searchInputRef={headerRef} />
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
