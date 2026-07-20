import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function test', () => {
    it('should return "internal" for internal urls with index.html removed', () => {
        const linkurl = "http://sub.domain.com/aaa/bbb/ccc/index.html";
        const pageurl = "http://sub.domain.com/aaa/bbb/";
        const result = gettype(linkurl, pageurl);
        expect(result).toBe("internal");
    });
});