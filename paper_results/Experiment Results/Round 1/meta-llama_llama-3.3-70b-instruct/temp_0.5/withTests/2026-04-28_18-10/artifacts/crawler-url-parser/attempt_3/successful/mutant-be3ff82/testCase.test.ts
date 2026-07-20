import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', () => {
    it('should return correct type for same level urls with index.html', () => {
        const linkUrl = "http://sub.domain.com/aaa/bbb/index.html";
        const pageUrl = "http://sub.domain.com/aaa/bbb/index.html";
        const result = gettype(linkUrl, pageUrl);
        expect(result).toBe("samelevel");
    });
});