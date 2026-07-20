import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
    it('should handle baseUrl with # in path correctly', () => {
        const currentUrl = 'http://example.com/path';
        const baseUrl = 'http://example.com/path#with#fragment';
        const result = parse(currentUrl, baseUrl);
        expect(result).not.toBeNull();
        expect(result.baseurl).toBe('http://example.com/path#with');
    });
});