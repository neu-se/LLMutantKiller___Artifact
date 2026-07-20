import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
    it('should handle baseUrl with fragment correctly', () => {
        const currentUrl = 'http://example.com';
        const baseUrl = 'http://example.com#fragment';
        const result = parse(currentUrl, baseUrl);
        expect(result).not.toBeNull();
        expect(result.url).toBe('http://example.com/');
    });
});