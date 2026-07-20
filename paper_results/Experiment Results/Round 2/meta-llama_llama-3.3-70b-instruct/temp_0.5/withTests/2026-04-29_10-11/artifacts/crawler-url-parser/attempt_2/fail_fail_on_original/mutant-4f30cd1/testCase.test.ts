import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract function test', () => {
    it('should pass for short url with javascript protocol', () => {
        const html = '<a href="javascript:void(0)">Test</a><a href="//example.com">Test</a>';
        const baseUrl = 'http://example.com';
        const result = extract(html, baseUrl);
        expect(result.length).toBe(1);
    });

    it('should pass for short url with mailto protocol', () => {
        const html = '<a href="mailto:test@example.com">Test</a><a href="//example.com">Test</a>';
        const baseUrl = 'http://example.com';
        const result = extract(html, baseUrl);
        expect(result.length).toBe(1);
    });

    it('should pass for short url with ftp protocol', () => {
        const html = '<a href="ftp://example.com">Test</a><a href="//example.com">Test</a>';
        const baseUrl = 'http://example.com';
        const result = extract(html, baseUrl);
        expect(result.length).toBe(1);
    });
});