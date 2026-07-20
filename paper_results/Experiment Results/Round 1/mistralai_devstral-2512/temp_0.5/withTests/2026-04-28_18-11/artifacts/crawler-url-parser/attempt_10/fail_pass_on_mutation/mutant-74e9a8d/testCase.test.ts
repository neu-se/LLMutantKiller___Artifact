import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype mutation test', () => {
    it('should correctly identify internal when comparing paths where pageurl ends with default.html', () => {
        const linkUrl = "http://example.com/aaa/bbb/ccc/ddd";
        const pageUrl = "http://example.com/aaa/bbb/default.html";
        const result = gettype(linkUrl, pageUrl);
        expect(result).toBe("internal");
    });
});