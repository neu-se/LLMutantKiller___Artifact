import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function test', () => {
    it('should return correct type for urls with index and default pages', () => {
        const linkurl = "http://sub.domain.com/aaa/bbb/index.html";
        const pageurl = "http://sub.domain.com/aaa/bbb/default.html";
        const result = gettype(linkurl, pageurl);
        expect(result).toBe("samelevel");
    });
});