import React, { useState, useEffect, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';

import SearchIcon from '../../assets/img/search.svg';
import CrossIcon from '../../assets/img/cross.svg';

import './SearchBar.style.css';

const SearchBar = ({
    onSearch,
    searchInputRef,
    canClearSearchInputValue,
    setClearSearchInputValue,
}) => {
    const [searchInputValue, setSearchInputValue] = useState('');

    const onSearchInputValueChanged = event => {
        const value = event.target.value;
        setSearchInputValue(value);
    }

    const clearSearchInputValue = () => {
        setSearchInputValue('');
    };

    const handleSubmit = event => {
        event.preventDefault();
        if (searchInputValue?.length) {
            onSearch(searchInputValue);
        }
    };

    useImperativeHandle(searchInputRef, () => ({
        getSearchKey: () => {
          return searchInputValue;
        }
    }));

    useEffect(() => {
        if (canClearSearchInputValue){
            setSearchInputValue('');
            setClearSearchInputValue(false);
        }
    }, [canClearSearchInputValue, setClearSearchInputValue]);

    return(
        <>
            <div className="search-input-wrapper" data-testid="search-input-wrapper">
                <form onSubmit={handleSubmit} className="search-form" data-testid="search-form">
                    <div className="form-controls">
                        <label>Search</label>
                        <input
                            id="video-search"
                            data-testid="video-search"
                            type="text"
                            value={searchInputValue}
                            onChange={onSearchInputValueChanged}
                            placeholder="Search"
                        />
                        {searchInputValue?.length ?
                            <div className="cross-icon-wrapper" data-testid="cross-icon" onClick={clearSearchInputValue}>
                                <img src={CrossIcon} alt="Icon" title="Clear" className="cross-icon" />
                            </div>
                        :
                            <></>
                        }
                    </div>
                </form>
                <button className="search-button" data-testid="search-button" onClick={handleSubmit}>
                    <img src={SearchIcon} alt="searchVideos" title="search" className="search-icon" />
                </button>
            </div>
        </>
    );
}

SearchBar.propTypes = {
    onSearch: PropTypes.func.isRequired,
    searchInputRef: PropTypes.shape({}),
    canClearSearchInputValue: PropTypes.bool,
};

SearchBar.defaultProps = {
    searchInputRef: null,
    canClearSearchInputValue: false,
};

export default SearchBar;
