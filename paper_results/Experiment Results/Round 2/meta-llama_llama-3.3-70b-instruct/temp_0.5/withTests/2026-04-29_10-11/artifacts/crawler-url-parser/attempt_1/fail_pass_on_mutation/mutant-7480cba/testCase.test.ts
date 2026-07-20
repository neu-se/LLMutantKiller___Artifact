import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
    it('should correctly parse URL with colon in the path', () => {
        const url = 'http://example.com/path:with/colon';
        const result = parse(url);
        expect(result.url).toBe('http://example.com/path:with/colon');
    });

    it('should correctly parse URL without protocol', () => {
        const url = 'example.com';
        const result = parse(url);
        expect(result.url).toBe('http://example.com/');
    });

    it('should correctly parse URL with protocol', () => {
        const url = 'http://example.com';
        const result = parse(url);
        expect(result.url).toBe('http://example.com/');
    });

    it('should correctly parse URL with subdomain', () => {
        const url = 'http://sub.example.com';
        const result = parse(url);
        expect(result.url).toBe('http://sub.example.com/');
    });

    it('should correctly parse URL with query parameters', () => {
        const url = 'http://example.com/path?a=1&b=2';
        const result = parse(url);
        expect(result.url).toBe('http://example.com/path?a=1&b=2');
    });

    it('should correctly parse URL with fragment', () => {
        const url = 'http://example.com/path#fragment';
        const result = parse(url);
        expect(result.url).toBe('http://example.com/path');
    });
});