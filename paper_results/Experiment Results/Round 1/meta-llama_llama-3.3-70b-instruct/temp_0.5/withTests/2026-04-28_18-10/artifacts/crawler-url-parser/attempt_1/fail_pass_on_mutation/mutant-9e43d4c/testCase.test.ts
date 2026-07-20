import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
    it('should return null for invalid protocol', () => {
        const url = 'htp://www.google.com';
        const result = parse(url);
        expect(result).toBeNull();
    });

    it('should return null for invalid protocol with base url', () => {
        const url = 'htp://www.google.com';
        const baseUrl = 'http://www.facebook.com';
        const result = parse(url, baseUrl);
        expect(result).toBeNull();
    });

    it('should parse url correctly', () => {
        const url = 'http://www.google.com/aaa/bbb/ccc';
        const result = parse(url);
        expect(result.url).toBe('http://www.google.com/aaa/bbb/ccc');
    });

    it('should parse url correctly with base url', () => {
        const url = '../ddd';
        const baseUrl = 'http://www.stackoverflow.com/aaa/bbb/ccc';
        const result = parse(url, baseUrl);
        expect(result.url).toBe('http://www.stackoverflow.com/aaa/ddd');
    });
});