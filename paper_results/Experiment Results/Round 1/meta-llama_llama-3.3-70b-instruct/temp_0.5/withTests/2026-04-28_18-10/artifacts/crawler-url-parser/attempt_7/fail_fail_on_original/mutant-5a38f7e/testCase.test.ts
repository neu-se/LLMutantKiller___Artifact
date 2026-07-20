import { gettype } from './crawler-url-parser';

describe('gettype function test', function () {
    it('should return the correct result when linkurl and pageurl are the same', function () {
        let linkurl = "http://example.com/aaa/bbb/ccc";
        let pageurl = "http://example.com/aaa/bbb/ccc";
        let result = gettype(linkurl, pageurl);
        expect(result).toBe('internal');
    });
});