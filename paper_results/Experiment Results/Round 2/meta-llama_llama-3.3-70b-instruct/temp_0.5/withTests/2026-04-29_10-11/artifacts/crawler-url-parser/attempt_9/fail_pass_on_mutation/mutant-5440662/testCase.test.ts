import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', () => {
    it('should return the correct type when linkurl_path and pageurl_path are the same', () => {
        let linkurl = { path: '/aaa/bbb/ccc', host: 'sub.domain.com', subdomain: 'sub', domain: 'domain.com' };
        let pageurl = { path: '/aaa/bbb/ccc', host: 'sub.domain.com', subdomain: 'sub', domain: 'domain.com' };
        let result = gettype(linkurl, pageurl);
        expect(result).toBe('samelevel');
    });

    it.skip('should throw an error when pageurl_path is not a valid path', () => {
        let linkurl = { path: '/aaa/bbb/ccc', host: 'sub.domain.com', subdomain: 'sub', domain: 'domain.com' };
        let pageurl = { path: 'Stryker was here!', host: 'sub.domain.com', subdomain: 'sub', domain: 'domain.com' };
        expect(() => gettype(linkurl, pageurl)).toThrowError();
    });
});