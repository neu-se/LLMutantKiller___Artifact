import { gettype } from './crawler-url-parser';

describe('gettype function test', function () {
    it('should return the correct result when linkurl_path is empty string', function () {
        let linkurl = { protocol: 'http:', host: 'example.com', path: '' };
        let pageurl = { protocol: 'http:', host: 'example.com', path: '/aaa/bbb/ccc' };
        let result = gettype(linkurl, pageurl);
        expect(result).toBe('internal');
    });

    it('should return the correct result when linkurl_path is "Stryker was here!"', function () {
        let linkurl = { protocol: 'http:', host: 'example.com', path: 'Stryker was here!' };
        let pageurl = { protocol: 'http:', host: 'example.com', path: '/aaa/bbb/ccc' };
        let result = gettype(linkurl, pageurl);
        expect(result).not.toBe('internal');
    });
});