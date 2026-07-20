import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function with default.html path', () => {
    it('should correctly handle default.html paths and return "samelevel" when paths are different', () => {
        const linkUrl = "http://example.com/path1/default.html";
        const pageUrl = "http://example.com/path2/";
        const result = gettype(linkUrl, pageUrl);
        expect(result).toBe("samelevel");
    });
});