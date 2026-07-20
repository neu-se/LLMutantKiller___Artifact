import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype mutation test', () => {
    it('should correctly handle paths with default.x files', () => {
        const linkUrl = "http://example.com/aaa/bbb/";
        const pageUrl = "http://example.com/aaa/bbb/default.x";
        const result = gettype(linkUrl, pageUrl);
        expect(result).toBe("samelevel");
    });
});