import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function with default.html path', () => {
    it('should correctly handle default.html paths and return "samelevel" when paths differ', () => {
        const linkUrl = "http://example.com/path/default.html";
        const pageUrl = "http://example.com/otherpath/";
        const result = gettype(linkUrl, pageUrl);
        expect(result).toBe("samelevel");
    });
});