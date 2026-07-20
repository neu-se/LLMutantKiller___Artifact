import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', () => {
    it('should return "samelevel" when linkurl_path and pageurl_path are the same', () => {
        let linkurl = { path: '/aaa/bbb/ccc', host: 'sub.domain.com' };
        let pageurl = { path: '/aaa/bbb/ccc', host: 'sub.domain.com' };
        let result = gettype(linkurl, pageurl);
        expect(result).toBe('samelevel');
    });

    it.skip('should return "samelevel" when linkurl_path and pageurl_path are the same but have different subdomains', () => {
        let linkurl = { path: '/aaa/bbb/ccc', host: 'sub1.domain.com' };
        let pageurl = { path: '/aaa/bbb/ccc', host: 'sub2.domain.com' };
        let result = gettype(linkurl, pageurl);
        expect(result).toBe('external');
    });

    it.skip('should return "internal" when linkurl_path and pageurl_path are on the same domain but different paths', () => {
        let linkurl = { path: '/aaa/bbb/ccc', host: 'sub.domain.com' };
        let pageurl = { path: '/aaa/bbb/ddd', host: 'sub.domain.com' };
        let result = gettype(linkurl, pageurl);
        expect(result).toBe('internal');
    });

    it('should return "sublevel" when linkurl_path is a sublevel of pageurl_path', () => {
        let linkurl = { path: '/aaa/bbb/ccc/ddd', host: 'sub.domain.com' };
        let pageurl = { path: '/aaa/bbb/ccc', host: 'sub.domain.com' };
        let result = gettype(linkurl, pageurl);
        expect(result).toBe('sublevel');
    });

    it('should return "uplevel" when linkurl_path is an uplevel of pageurl_path', () => {
        let linkurl = { path: '/aaa/bbb', host: 'sub.domain.com' };
        let pageurl = { path: '/aaa/bbb/ccc', host: 'sub.domain.com' };
        let result = gettype(linkurl, pageurl);
        expect(result).toBe('uplevel');
    });

    it.skip('should return "external" when linkurl and pageurl are on different domains', () => {
        let linkurl = { path: '/aaa/bbb/ccc', host: 'sub1.domain.com' };
        let pageurl = { path: '/aaa/bbb/ccc', host: 'sub2.domain.com' };
        let result = gettype(linkurl, pageurl);
        expect(result).toBe('external');
    });
});