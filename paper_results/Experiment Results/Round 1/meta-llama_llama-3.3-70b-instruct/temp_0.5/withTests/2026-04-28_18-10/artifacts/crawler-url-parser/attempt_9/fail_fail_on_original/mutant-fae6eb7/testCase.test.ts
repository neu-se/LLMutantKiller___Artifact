import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
    it('should handle baseUrl with # in query correctly', () => {
        const currentUrl = 'http://example.com/path';
        const baseUrl = 'http://example.com/path?a=1#b=2';
        const resultOriginal = parse(currentUrl, baseUrl);
        expect(resultOriginal).not.toBeNull();
        expect(resultOriginal.baseurl).toBe('http://example.com/path?a=1');
    });
});