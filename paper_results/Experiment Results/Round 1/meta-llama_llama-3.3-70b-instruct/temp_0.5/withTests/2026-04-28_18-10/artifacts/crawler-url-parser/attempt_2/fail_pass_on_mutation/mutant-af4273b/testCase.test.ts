import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
    it('should correctly parse URL with query parameters and baseUrl', () => {
        const url = '../path?a=1&b=2';
        const baseUrl = 'http://example.com/base';
        const result = parse(url, baseUrl);
        expect(result.url).toBe('http://example.com/path?a=1&b=2');
    });
});