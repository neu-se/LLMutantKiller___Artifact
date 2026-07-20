import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function with default.aspx path', () => {
    it('should correctly handle default.aspx paths and return "uplevel"', () => {
        const linkUrl = "http://example.com/path/default.aspx";
        const pageUrl = "http://example.com/path/subpath/";
        const result = gettype(linkUrl, pageUrl);
        expect(result).toBe("uplevel");
    });
});