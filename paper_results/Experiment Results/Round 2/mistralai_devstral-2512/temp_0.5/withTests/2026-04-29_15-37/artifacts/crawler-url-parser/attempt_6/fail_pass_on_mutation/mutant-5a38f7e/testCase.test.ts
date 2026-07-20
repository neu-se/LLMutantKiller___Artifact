import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype with undefined path', () => {
    it('should handle undefined path correctly', () => {
        const linkurl = { path: undefined, host: 'example.com', domain: 'example.com', subdomain: '' };
        const pageurl = { path: '/aaa/bbb', host: 'example.com', domain: 'example.com', subdomain: '' };
        const result = gettype(linkurl, pageurl);
        expect(result).toBe('internal');
    });
});