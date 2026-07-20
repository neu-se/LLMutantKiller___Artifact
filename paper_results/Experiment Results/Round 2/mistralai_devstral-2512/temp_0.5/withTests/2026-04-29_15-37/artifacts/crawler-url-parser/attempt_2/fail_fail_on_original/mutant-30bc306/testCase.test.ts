import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype mutation test', () => {
    it('should correctly identify samelevel when pageurl ends with index.htm', () => {
        const linkUrl = "http://example.com/aaa/bbb/ccc";
        const pageUrl = "http://example.com/aaa/bbb/index.htm";
        const result = gettype(linkUrl, pageUrl);
        expect(result).toBe("samelevel");
    });
});