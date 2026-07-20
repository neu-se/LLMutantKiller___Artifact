import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype mutation test', () => {
    it('should correctly identify samelevel when paths differ only by default.html', () => {
        const linkUrl = "http://example.com/aaa/bbb/default.html";
        const pageUrl = "http://example.com/aaa/bbb";
        const result = gettype(linkUrl, pageUrl);
        expect(result).toBe("samelevel");
    });
});