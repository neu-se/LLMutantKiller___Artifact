import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype mutation test', () => {
    it('should return "internal" for URLs with path difference greater than 1', () => {
        const linkUrl = "http://example.com/aaa/bbb/ccc/ddd/eee";
        const pageUrl = "http://example.com/aaa/bbb";
        const result = gettype(linkUrl, pageUrl);
        expect(result).toBe("internal");
    });
});