import { extract } from '../crawler-url-parser';

describe('extract function', () => {
    it('should return different results for original and mutated code', () => {
        const html = '<html><body><a href="http://www.example.com/test">Test Link</a></body></html>';
        const baseUrl = "http://www.example.com";

        // Original code
        const result = extract(html, baseUrl);
        expect(result.length).toBe(1);
    });
});