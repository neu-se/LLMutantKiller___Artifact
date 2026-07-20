import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
    it('should correctly parse URL with query parameters and baseUrl that has query parameters', () => {
        const url = '../path?a=1&b=2';
        const baseUrl = 'http://example.com/base?a=3&b=4';
        const result = parse(url, baseUrl);
        expect(result.baseurl).toBe('http://example.com/base?a=3&b=4');
        const parsedBaseUrl = new URL(baseUrl);
        const parsedResultBaseUrl = new URL(result.baseurl);
        expect(parsedResultBaseUrl.searchParams.get('a')).toBe('3');
        expect(parsedResultBaseUrl.searchParams.get('b')).toBe('4');
    });
});