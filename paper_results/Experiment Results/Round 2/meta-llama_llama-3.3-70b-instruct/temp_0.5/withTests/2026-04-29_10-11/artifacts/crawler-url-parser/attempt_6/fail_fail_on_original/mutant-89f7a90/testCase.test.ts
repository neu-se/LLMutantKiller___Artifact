import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
    it('should return the correct url when the baseUrl has a fragment', () => {
        const currentUrl = "http://example.com";
        const baseUrl = "http://example.com#fragment";
        const result = parse(currentUrl, baseUrl);
        expect(result).not.toBeNull();
        expect(result.baseurl).toBe("http://example.com/");
    });
});