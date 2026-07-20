import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype mutation test', () => {
    it('should correctly identify uplevel when page has exactly one more path part than link', () => {
        const linkUrl = "http://example.com/aaa/bbb";
        const pageUrl = "http://example.com/aaa/bbb/ccc";
        const result = gettype(linkUrl, pageUrl);
        expect(result).toBe("uplevel");
    });
});