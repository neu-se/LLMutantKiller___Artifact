import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype mutation test', () => {
    it('should correctly handle pageurl_path ending with index.html when comparing paths', () => {
        const linkUrl = "http://example.com/aaa/bbb";
        const pageUrl = "http://example.com/aaa/index.html";
        const result = gettype(linkUrl, pageUrl);
        expect(result).toBe("sublevel");
    });
});