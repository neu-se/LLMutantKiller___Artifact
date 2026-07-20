import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype mutation test', () => {
    it('should correctly identify samelevel when both paths end with index.html', () => {
        const linkUrl = "http://example.com/aaa/bbb/index.html";
        const pageUrl = "http://example.com/aaa/index.html";
        const result = gettype(linkUrl, pageUrl);
        expect(result).toBe("sublevel");
    });
});