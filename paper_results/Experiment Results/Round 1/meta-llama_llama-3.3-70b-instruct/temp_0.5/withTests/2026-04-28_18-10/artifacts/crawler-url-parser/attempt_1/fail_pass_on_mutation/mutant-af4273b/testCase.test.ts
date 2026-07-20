import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
    it('should correctly parse URL with query parameters', () => {
        const url = 'http://example.com/path?a=1&b=2';
        const baseUrl = 'http://example.com';
        const result = parse(url, baseUrl);
        expect(result.url).toBe('http://example.com/path?a=1&b=2');
    });

    it('should correctly parse relative URL with query parameters', () => {
        const url = '/path?a=1&b=2';
        const baseUrl = 'http://example.com';
        const result = parse(url, baseUrl);
        expect(result.url).toBe('http://example.com/path?a=1&b=2');
    });

    it('should correctly parse URL with fragment', () => {
        const url = 'http://example.com/path#a=1&b=2';
        const baseUrl = 'http://example.com';
        const result = parse(url, baseUrl);
        expect(result.url).toBe('http://example.com/path');
    });

    it('should correctly parse relative URL with fragment', () => {
        const url = '/path#a=1&b=2';
        const baseUrl = 'http://example.com';
        const result = parse(url, baseUrl);
        expect(result.url).toBe('http://example.com/path');
    });
});