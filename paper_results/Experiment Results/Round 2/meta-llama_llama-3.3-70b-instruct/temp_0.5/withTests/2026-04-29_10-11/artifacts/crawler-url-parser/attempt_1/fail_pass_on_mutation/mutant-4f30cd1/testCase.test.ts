import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract function test', () => {
    it('should pass for javascript protocol', () => {
        const html = '<a href="javascript:void(0)">Test</a>';
        const baseUrl = 'http://example.com';
        const result = extract(html, baseUrl);
        expect(result.length).toBe(0);
    });

    it('should pass for mailto protocol', () => {
        const html = '<a href="mailto:test@example.com">Test</a>';
        const baseUrl = 'http://example.com';
        const result = extract(html, baseUrl);
        expect(result.length).toBe(0);
    });

    it('should pass for ftp protocol', () => {
        const html = '<a href="ftp://example.com">Test</a>';
        const baseUrl = 'http://example.com';
        const result = extract(html, baseUrl);
        expect(result.length).toBe(0);
    });

    it.skip('should pass for short url', () => {
        const html = '<a href="//example.com">Test</a>';
        const baseUrl = 'http://example.com';
        const result = extract(html, baseUrl);
        expect(result.length).toBe(1);
    });

    it('should pass for relative url', () => {
        const html = '<a href="/test">Test</a>';
        const baseUrl = 'http://example.com';
        const result = extract(html, baseUrl);
        expect(result.length).toBe(1);
    });
});