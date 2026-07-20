import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype mutation test', () => {
    it('should return "internal" when path difference is exactly -2', () => {
        const linkUrl = "http://example.com/aaa";
        const pageUrl = "http://example.com/aaa/bbb/ccc";
        const result = gettype(linkUrl, pageUrl);
        expect(result).toBe("internal");
    });
});