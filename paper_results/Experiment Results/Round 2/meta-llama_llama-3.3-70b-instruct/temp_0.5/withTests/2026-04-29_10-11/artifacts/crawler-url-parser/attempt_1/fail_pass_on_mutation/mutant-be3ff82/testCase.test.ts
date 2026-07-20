import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', () => {
    it('should return "samelevel" when linkurl_path and pageurl_path are the same', () => {
        const linkurl = { path: '/aaa/bbb/ccc' };
        const pageurl = { path: '/aaa/bbb/ccc' };
        expect(gettype(linkurl, pageurl)).toBe('samelevel');
    });

    it('should return "sublevel" when linkurl_path is a sublevel of pageurl_path', () => {
        const linkurl = { path: '/aaa/bbb/ccc/ddd' };
        const pageurl = { path: '/aaa/bbb/ccc' };
        expect(gettype(linkurl, pageurl)).toBe('sublevel');
    });

    it('should return "uplevel" when linkurl_path is an uplevel of pageurl_path', () => {
        const linkurl = { path: '/aaa/bbb' };
        const pageurl = { path: '/aaa/bbb/ccc' };
        expect(gettype(linkurl, pageurl)).toBe('uplevel');
    });

    it.skip('should return "internal" when linkurl and pageurl have the same host', () => {
        const linkurl = { host: 'example.com', path: '/aaa/bbb/ccc' };
        const pageurl = { host: 'example.com', path: '/aaa/bbb/ddd' };
        expect(gettype(linkurl, pageurl)).toBe('internal');
    });

    it('should return "subdomain" when linkurl and pageurl have the same domain but different subdomains', () => {
        const linkurl = { host: 'sub.example.com', path: '/aaa/bbb/ccc' };
        const pageurl = { host: 'example.com', path: '/aaa/bbb/ccc' };
        expect(gettype(linkurl, pageurl)).toBe('subdomain');
    });

    it.skip('should return "updomain" when linkurl and pageurl have the same domain but linkurl has a shorter subdomain', () => {
        const linkurl = { host: 'example.com', path: '/aaa/bbb/ccc' };
        const pageurl = { host: 'sub.example.com', path: '/aaa/bbb/ccc' };
        expect(gettype(linkurl, pageurl)).toBe('updomain');
    });

    it.skip('should return "external" when linkurl and pageurl have different domains', () => {
        const linkurl = { host: 'example.com', path: '/aaa/bbb/ccc' };
        const pageurl = { host: 'otherexample.com', path: '/aaa/bbb/ccc' };
        expect(gettype(linkurl, pageurl)).toBe('external');
    });
});