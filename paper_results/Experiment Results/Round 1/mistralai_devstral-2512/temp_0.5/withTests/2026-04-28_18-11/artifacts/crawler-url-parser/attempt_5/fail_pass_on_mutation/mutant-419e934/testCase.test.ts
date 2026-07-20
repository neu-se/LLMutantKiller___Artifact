import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype mutation test', () => {
    it('should correctly identify uplevel when pageurl_path ends with index.html', () => {
        const linkUrl = "http://example.com/aaa";
        const pageUrl = "http://example.com/aaa/bbb/index.html";
        const result = gettype(linkUrl, pageUrl);
        expect(result).toBe("uplevel");
    });
});