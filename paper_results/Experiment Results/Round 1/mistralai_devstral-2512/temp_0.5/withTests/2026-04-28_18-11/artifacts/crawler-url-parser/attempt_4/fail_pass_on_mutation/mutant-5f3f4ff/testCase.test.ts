import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype mutation test', () => {
    it('should correctly identify samelevel relationship when link and page have same path depth', () => {
        const linkUrl = "http://example.com/aaa/bbb/ccc";
        const pageUrl = "http://example.com/aaa/bbb/ddd";
        const result = gettype(linkUrl, pageUrl);
        expect(result).toBe("samelevel");
    });
});