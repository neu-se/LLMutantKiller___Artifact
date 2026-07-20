import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function test', () => {
    it('should return "samelevel" for same level urls', () => {
        const linkurl = "http://sub.domain.com/aaa/bbb/index.html";
        const pageurl = "http://sub.domain.com/aaa/bbb/index2.html";
        const result = gettype(linkurl, pageurl);
        expect(result).toBe("samelevel");
    });
});