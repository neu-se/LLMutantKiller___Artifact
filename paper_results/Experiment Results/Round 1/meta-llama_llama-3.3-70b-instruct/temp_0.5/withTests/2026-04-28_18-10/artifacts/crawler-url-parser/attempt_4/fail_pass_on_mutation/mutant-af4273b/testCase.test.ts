import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
    it('should correctly parse URL with query parameters and baseUrl that has query parameters, and query parameters should be preserved', () => {
        const url = '../path?a=1&b=2';
        const baseUrl = 'http://example.com/base?c=3&d=4';
        const result = parse(url, baseUrl);
        expect(result.url).toBe('http://example.com/path?a=1&b=2');
    });
});