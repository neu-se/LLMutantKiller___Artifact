import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', () => {
    it.skip('should return "internal" for same host and same path', () => {
        let linkurl = { host: 'www.example.com', path: '/path' };
        let pageurl = { host: 'www.example.com', path: '/path' };
        expect(gettype(linkurl, pageurl)).toBe('internal');
    });

    it.skip('should return "internal" for same host and different path', () => {
        let linkurl = { host: 'www.example.com', path: '/path1' };
        let pageurl = { host: 'www.example.com', path: '/path2' };
        expect(gettype(linkurl, pageurl)).toBe('internal');
    });

    it('should return "subdomain" for same domain and different subdomain', () => {
        let linkurl = { host: 'sub1.example.com', path: '/path' };
        let pageurl = { host: 'sub2.example.com', path: '/path' };
        expect(gettype(linkurl, pageurl)).toBe('subdomain');
    });

    it.skip('should return "updomain" for same subdomain and different domain', () => {
        let linkurl = { host: 'example1.com', path: '/path' };
        let pageurl = { host: 'example2.com', path: '/path' };
        expect(gettype(linkurl, pageurl)).toBe('external');
    });

    it.skip('should return "external" for different host', () => {
        let linkurl = { host: 'example1.com', path: '/path' };
        let pageurl = { host: 'example2.com', path: '/path' };
        expect(gettype(linkurl, pageurl)).toBe('external');
    });
});