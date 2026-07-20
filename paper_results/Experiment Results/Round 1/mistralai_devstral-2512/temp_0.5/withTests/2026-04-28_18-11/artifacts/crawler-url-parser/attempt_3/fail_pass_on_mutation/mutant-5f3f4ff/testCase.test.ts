import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype mutation test', () => {
    it('should correctly identify uplevel relationship when link has one fewer path part than page', () => {
        const linkUrl = "http://example.com/aaa";
        const pageUrl = "http://example.com/aaa/bbb";
        const result = gettype(linkUrl, pageUrl);
        expect(result).toBe("uplevel");
    });
});