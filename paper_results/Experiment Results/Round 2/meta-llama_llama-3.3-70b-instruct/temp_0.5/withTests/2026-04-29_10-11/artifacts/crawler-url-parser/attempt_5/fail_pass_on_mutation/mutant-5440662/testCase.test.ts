import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', () => {
    it('should return the correct type when linkurl_path and pageurl_path are the same', () => {
        let linkurl = { path: '/aaa/bbb/ccc', host: 'sub.domain.com', subdomain: 'sub', domain: 'domain.com' };
        let pageurl = { path: '/aaa/bbb/ccc', host: 'sub.domain.com', subdomain: 'sub', domain: 'domain.com' };
        let result = gettype(linkurl, pageurl);
        expect(result).toBe('samelevel');
    });

    it.skip('should return "external" when linkurl and pageurl are on different domains', () => {
        let linkurl = { path: '/aaa/bbb/ccc', host: 'sub1.domain.com', subdomain: 'sub1', domain: 'domain.com' };
        let pageurl = { path: '/aaa/bbb/ccc', host: 'sub2.domain.com', subdomain: 'sub2', domain: 'domain.com' };
        let result = gettype(linkurl, pageurl);
        expect(result).toBe('external');
    });
});