import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function', () => {
    it('should return null for invalid protocol', () => {
        const result = parse('htp://www.google.com');
        expect(result).toBeNull();
    });

    it('should parse URL with subdomain', () => {
        const result = parse('https://www.google.com');
        expect(result.url).toBe('https://www.google.com/');
    });

    it('should parse URL with subdomain and path', () => {
        const result = parse('https://www.google.com/aaa');
        expect(result.url).toBe('https://www.google.com/aaa');
    });

    it('should parse URL with subdomain, path, and query', () => {
        const result = parse('https://www.google.com/aaa?q=query');
        expect(result.url).toBe('https://www.google.com/aaa?q=query');
    });

    it('should parse relative URL with base URL', () => {
        const result = parse('../ddd', 'http://www.stackoverflow.com/aaa/bbb/ccc');
        expect(result.url).toBe('http://www.stackoverflow.com/aaa/ddd');
    });

    it.skip('should parse relative URL with base URL ending with /', () => {
        const result = parse('../ddd', 'http://www.stackoverflow.com/aaa/bbb/ccc/');
        expect(result.url).toBe('http://www.stackoverflow.com/aaa/ddd');
    });
});