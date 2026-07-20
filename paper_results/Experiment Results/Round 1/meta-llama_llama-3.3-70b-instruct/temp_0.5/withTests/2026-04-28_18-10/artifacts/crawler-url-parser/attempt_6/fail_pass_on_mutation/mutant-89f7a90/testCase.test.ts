import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
    it('should not modify the baseUrl', () => {
        const currentUrl = 'http://example.com';
        const originalBaseUrl = 'http://example.com#fragment';
        const baseUrl = originalBaseUrl;
        parse(currentUrl, baseUrl);
        expect(baseUrl).toBe(originalBaseUrl);
    });
});