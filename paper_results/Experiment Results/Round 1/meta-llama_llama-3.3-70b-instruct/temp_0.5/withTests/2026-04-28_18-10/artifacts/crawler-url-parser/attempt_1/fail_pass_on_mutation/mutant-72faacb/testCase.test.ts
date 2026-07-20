import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract function test', () => {
    it.skip('should pass for valid href', () => {
        const html = '<a href="http://www.stackoverflow.com">test-link</a>';
        const baseUrl = 'http://www.stackoverflow.com';
        const result = extract(html, baseUrl);
        expect(result.length).toBe(1);
        expect(result[0].url).toBe('http://www.stackoverflow.com');
    });

    it('should fail for invalid href', () => {
        const html = '<a href="">test-link</a>';
        const baseUrl = 'http://www.stackoverflow.com';
        const result = extract(html, baseUrl);
        expect(result.length).toBe(0);
    });

    it.skip('should pass for undefined href', () => {
        const html = '<a href="undefined">test-link</a>';
        const baseUrl = 'http://www.stackoverflow.com';
        const result = extract(html, baseUrl);
        expect(result.length).toBe(0);
    });
});