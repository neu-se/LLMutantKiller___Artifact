import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype mutation test', () => {
    it('should correctly handle path comparison when both paths contain index.html', () => {
        const linkUrl = "http://example.com/aaa/index.html";
        const pageUrl = "http://example.com/aaa/bbb/index.html";
        const result = gettype(linkUrl, pageUrl);
        expect(result).toBe("uplevel");
    });
});