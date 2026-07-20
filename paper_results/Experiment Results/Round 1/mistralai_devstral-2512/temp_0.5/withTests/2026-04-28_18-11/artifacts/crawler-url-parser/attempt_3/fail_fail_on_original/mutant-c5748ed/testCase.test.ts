import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype mutation test', () => {
    it('should correctly handle paths with index.html in the middle of the path', () => {
        const linkUrl = "http://example.com/aaa/index.html/bbb";
        const pageUrl = "http://example.com/aaa/index.html";
        const result = gettype(linkUrl, pageUrl);
        expect(result).toBe("sublevel");
    });
});