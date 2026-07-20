import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype with empty pageurl path', () => {
    it('should correctly identify relationship when pageurl has empty path', () => {
        const linkUrl = "http://example.com/path";
        const pageUrl = "http://example.com";
        const result = gettype(linkUrl, pageUrl);
        expect(result).toBe("sublevel");
    });
});