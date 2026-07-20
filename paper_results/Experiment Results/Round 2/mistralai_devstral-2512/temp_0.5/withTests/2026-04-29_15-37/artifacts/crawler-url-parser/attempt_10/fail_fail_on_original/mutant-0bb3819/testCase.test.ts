import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function with default.html path', () => {
    it('should correctly handle default.html paths and return "internal" when paths are at same level', () => {
        const linkUrl = "http://example.com/path/default.html";
        const pageUrl = "http://example.com/path/other.html";
        const result = gettype(linkUrl, pageUrl);
        expect(result).toBe("internal");
    });
});