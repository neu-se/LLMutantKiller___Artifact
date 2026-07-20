import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype mutation test', () => {
    it('should correctly identify sublevel relationship when link has exactly one more path part than page', () => {
        const linkUrl = "http://example.com/aaa/bbb/ccc";
        const pageUrl = "http://example.com/aaa/bbb";
        const result = gettype(linkUrl, pageUrl);
        expect(result).toBe("sublevel");
    });
});