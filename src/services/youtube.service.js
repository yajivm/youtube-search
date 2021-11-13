import ajax from '../helpers/ajaxHelpers';

const getVideoDetailsByKey = async (searchKey, maxResultsCount) => {
    const requestBody = {
        params: {
            q: searchKey,
            maxResults: maxResultsCount,
        },
    };
    console.log('requestBody=====>', requestBody);
    const response = await ajax.get('/search', requestBody);

    return response;
};

export {
    getVideoDetailsByKey,
};