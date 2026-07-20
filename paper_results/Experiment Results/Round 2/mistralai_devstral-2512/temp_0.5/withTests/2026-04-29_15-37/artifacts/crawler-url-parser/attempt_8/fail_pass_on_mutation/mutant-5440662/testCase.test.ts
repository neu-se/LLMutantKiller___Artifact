import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype with path handling', () => {
    it('should correctly handle path comparison when pageurl path is empty', () => {
        const linkUrl = "http://example.com/aaa";
        const pageUrl = "http://example.com";
        const result = gettype(linkUrl, pageUrl);
        expect(result).toBe("sublevel");
    });
});