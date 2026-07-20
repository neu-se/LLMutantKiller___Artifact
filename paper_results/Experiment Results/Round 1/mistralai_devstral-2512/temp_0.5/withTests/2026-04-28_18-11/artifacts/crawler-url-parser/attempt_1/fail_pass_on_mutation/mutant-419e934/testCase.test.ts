import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype mutation test', () => {
    it('should correctly identify samelevel when pageurl_path ends with index.html', () => {
        const linkUrl = "http://example.com/aaa/bbb/ccc";
        const pageUrl = "http://example.com/aaa/bbb/index.html";
        const result = gettype(linkUrl, pageUrl);
        expect(result).toBe("sublevel");
    });
});