import { extract } from '../../../subject_repositories/crawler-url-parser/crawler-url-parser';

describe('extract function', () => {
    it('should return different results for original and mutated code', () => {
        const html = '<html><body><a href="javascript:void(0)">Test Link</a></body></html>';
        const baseUrl = "http://www.example.com";

        // Original code
        const result = extract(html, baseUrl);
        expect(result.length).toBe(0);
    });
});