import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', () => {
    it('should return the correct type when linkurl_path and pageurl_path are the same', () => {
        let linkurl = { path: '/aaa/bbb/ccc', host: 'sub.domain.com', subdomain: 'sub', domain: 'domain.com' };
        let pageurl = { path: '/aaa/bbb/ccc', host: 'sub.domain.com', subdomain: 'sub', domain: 'domain.com' };
        let result = gettype(linkurl, pageurl);
        expect(result).toBe('samelevel');
    });

    it.skip('should return an incorrect type when pageurl_path is "Stryker was here!"', () => {
        let linkurl = { path: '/aaa/bbb/ccc', host: 'sub.domain.com', subdomain: 'sub', domain: 'domain.com' };
        let pageurl = { path: 'Stryker was here!', host: 'sub.domain.com', subdomain: 'sub', domain: 'domain.com' };
        let result = gettype(linkurl, pageurl);
        expect(result).not.toBe('internal');
    });
});