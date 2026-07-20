import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
    it('should correctly parse URLs without a protocol', () => {
        const url = 'example.com';
        const expectedUrl = 'http://example.com/';
        const result = parse(url);
        expect(result.url).toBe(expectedUrl);
    });

    it('should correctly parse URLs with a protocol', () => {
        const url = 'http://example.com';
        const expectedUrl = 'http://example.com/';
        const result = parse(url);
        expect(result.url).toBe(expectedUrl);
    });

    it('should correctly parse URLs with a protocol and path', () => {
        const url = 'http://example.com/path';
        const expectedUrl = 'http://example.com/path';
        const result = parse(url);
        expect(result.url).toBe(expectedUrl);
    });

    it('should correctly parse URLs with a protocol, path, and query parameters', () => {
        const url = 'http://example.com/path?a=1&b=2';
        const expectedUrl = 'http://example.com/path?a=1&b=2';
        const result = parse(url);
        expect(result.url).toBe(expectedUrl);
    });

    it('should correctly parse relative URLs', () => {
        const url = '/path';
        const baseUrl = 'http://example.com';
        const expectedUrl = 'http://example.com/path';
        const result = parse(url, baseUrl);
        expect(result.url).toBe(expectedUrl);
    });

    it('should correctly parse relative URLs with a path', () => {
        const url = '/path/subpath';
        const baseUrl = 'http://example.com/basepath';
        const expectedUrl = 'http://example.com/path/subpath';
        const result = parse(url, baseUrl);
        expect(result.url).toBe(expectedUrl);
    });

    it('should correctly parse relative URLs with a path and query parameters', () => {
        const url = '/path/subpath?a=1&b=2';
        const baseUrl = 'http://example.com/basepath';
        const expectedUrl = 'http://example.com/path/subpath?a=1&b=2';
        const result = parse(url, baseUrl);
        expect(result.url).toBe(expectedUrl);
    });
});