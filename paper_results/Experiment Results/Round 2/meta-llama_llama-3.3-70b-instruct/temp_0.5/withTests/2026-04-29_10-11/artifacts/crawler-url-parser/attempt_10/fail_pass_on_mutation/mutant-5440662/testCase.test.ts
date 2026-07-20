import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', () => {
    it('should return the correct type when linkurl_path and pageurl_path are the same', () => {
        let linkurl = { path: '/aaa/bbb/ccc', host: 'sub.domain.com', subdomain: 'sub', domain: 'domain.com' };
        let pageurl = { path: '/aaa/bbb/ccc', host: 'sub.domain.com', subdomain: 'sub', domain: 'domain.com' };
        let result = gettype(linkurl, pageurl);
        expect(result).toBe('samelevel');
    });

    it.skip('should return "internal" when linkurl_path is a subdirectory of pageurl_path and pageurl_path ends with an index file', () => {
        let linkurl = { path: '/aaa/bbb/ccc/index.html', host: 'sub.domain.com', subdomain: 'sub', domain: 'domain.com' };
        let pageurl = { path: '/aaa/bbb/ccc', host: 'sub.domain.com', subdomain: 'sub', domain: 'domain.com' };
        let result = gettype(linkurl, pageurl);
        expect(result).toBe('internal');
    });
});