import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract function test', () => {
    it('should pass for href with length less than 3', () => {
        const html = '<a href="ab">Test</a>';
        const baseUrl = 'http://example.com';
        const result = extract(html, baseUrl);
        expect(result.length).toBe(0);
    });

    it('should pass for href with length less than 3 and javascript protocol', () => {
        const html = '<a href="ja">Test</a>';
        const baseUrl = 'http://example.com';
        const result = extract(html, baseUrl);
        expect(result.length).toBe(0);
    });
});