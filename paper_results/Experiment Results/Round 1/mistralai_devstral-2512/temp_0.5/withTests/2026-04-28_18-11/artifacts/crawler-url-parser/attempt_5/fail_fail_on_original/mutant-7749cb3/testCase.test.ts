import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype mutation test', () => {
    it('should correctly handle paths ending with default.html when determining relationship', () => {
        const linkUrl = "http://example.com/aaa/bbb/default.html/ccc";
        const pageUrl = "http://example.com/aaa/bbb/default.html";
        const result = gettype(linkUrl, pageUrl);
        expect(result).toBe("sublevel");
    });
});