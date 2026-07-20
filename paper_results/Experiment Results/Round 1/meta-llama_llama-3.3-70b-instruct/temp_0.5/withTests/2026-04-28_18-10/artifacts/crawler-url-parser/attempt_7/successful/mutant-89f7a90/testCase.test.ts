import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
    it('should correctly handle baseUrl with a fragment', () => {
        const currentUrl = '/test';
        const baseUrl = 'http://example.com#fragment';
        const result = parse(currentUrl, baseUrl);
        expect(result.baseurl).toBe('http://example.com/');
    });
});