import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype mutation test', () => {
    it('should correctly handle paths with default.html in parent directory comparison', () => {
        const linkUrl = "http://example.com/aaa/default.html";
        const pageUrl = "http://example.com/aaa/default.html/bbb";
        const result = gettype(linkUrl, pageUrl);
        expect(result).toBe("uplevel");
    });
});