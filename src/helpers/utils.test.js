import {
    getPublishedDate,
    scrollReachedBottom,
} from './utils';

test('should return date value when call getPublishedDate method with string', () => {
    expect(getPublishedDate('2021-11-12T22:18:07Z')).toStrictEqual("13/10/2021");
});

test('should return boolen value when call scrollReachedBottom method', () => {
    expect(scrollReachedBottom()).toStrictEqual(true);
});
