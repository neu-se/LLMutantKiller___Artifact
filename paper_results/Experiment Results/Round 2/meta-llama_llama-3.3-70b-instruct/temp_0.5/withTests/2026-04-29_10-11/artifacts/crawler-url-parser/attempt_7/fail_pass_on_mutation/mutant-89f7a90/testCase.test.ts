import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
    it('should not modify the baseUrl when it has a fragment', () => {
        const currentUrl = "http://example.com";
        const baseUrl = "http://example.com#fragment";
        const originalBaseUrl = baseUrl;
        parse(currentUrl, baseUrl);
        expect(baseUrl).toBe(originalBaseUrl);
    });
});