import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse url', () => {
    it('should parse url correctly', () => {
        const url = 'http://example.com/path?a=1&b=2#hash';
        const result = parse(url);
        expect(result.url).toBe('http://example.com/path?a=1&b=2');
        expect(result.protocol).toBe('http:');
        expect(result.host).toBe('example.com');
        expect(result.path).toBe('/path');
        expect(result.search).toBe('?a=1&b=2');
        expect(result.querycount).toBe(2);
    });

    it('should parse url with query parameters correctly', () => {
        const url = 'http://example.com/path?a=1&b=2&c=3#hash';
        const result = parse(url);
        expect(result.url).toBe('http://example.com/path?a=1&b=2&c=3');
        expect(result.protocol).toBe('http:');
        expect(result.host).toBe('example.com');
        expect(result.path).toBe('/path');
        expect(result.search).toBe('?a=1&b=2&c=3');
        expect(result.querycount).toBe(3);
    });

    it('should parse url with fragment correctly', () => {
        const url = 'http://example.com/path?a=1&b=2#hash';
        const result = parse(url);
        expect(result.url).toBe('http://example.com/path?a=1&b=2');
        expect(result.protocol).toBe('http:');
        expect(result.host).toBe('example.com');
        expect(result.path).toBe('/path');
        expect(result.search).toBe('?a=1&b=2');
        expect(result.querycount).toBe(2);
    });
});