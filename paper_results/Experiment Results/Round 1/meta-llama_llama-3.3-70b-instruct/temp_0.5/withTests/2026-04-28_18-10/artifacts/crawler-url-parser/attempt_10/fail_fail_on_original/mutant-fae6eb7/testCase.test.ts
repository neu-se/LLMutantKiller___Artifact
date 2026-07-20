import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
    it('should handle # in baseUrl correctly', () => {
        const currentUrl = 'http://example.com/path';
        const baseUrl = 'http://example.com/base#';
        const resultOriginal = parse(currentUrl, baseUrl);
        expect(resultOriginal).not.toBeNull();
        expect(resultOriginal.baseurl).toBe('http://example.com/base');
    });
});