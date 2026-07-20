import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype mutation test', () => {
    it('should correctly handle paths ending with index.html', () => {
        const linkUrl = "http://example.com/aaa/bbb/index.html";
        const pageUrl = "http://example.com/aaa/bbb/ccc";
        const result = gettype(linkUrl, pageUrl);
        expect(result).toBe("uplevel");
    });
});