import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype mutation test', () => {
    it('should correctly identify internal relationship when link has two more path parts than page', () => {
        const linkUrl = "http://example.com/aaa/bbb/ccc/ddd";
        const pageUrl = "http://example.com/aaa/bbb";
        const result = gettype(linkUrl, pageUrl);
        expect(result).toBe("internal");
    });
});