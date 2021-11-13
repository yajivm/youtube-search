import ajax from  '../helpers/ajaxHelpers';
import { getVideoDetailsByKey } from './youtube.service';

const mockAjaxCall = jest.spyOn(ajax, 'get');

test('should return boolen value when call scrollReachedBottom method', async () => {
    mockAjaxCall.mockReturnValueOnce({});

    await getVideoDetailsByKey('aTestKey', 10);

    expect(mockAjaxCall).toHaveBeenCalledTimes(1);
    expect(mockAjaxCall).toHaveBeenCalledWith('/search', {
        params: {
            q: 'aTestKey',
            maxResults: 10,
        },
    });
});
