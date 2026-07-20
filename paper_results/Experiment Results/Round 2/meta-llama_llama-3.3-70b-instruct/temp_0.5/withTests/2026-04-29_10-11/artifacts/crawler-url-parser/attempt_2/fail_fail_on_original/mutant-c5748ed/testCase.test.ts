import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function test', () => {
    it('should return "samelevel" for same level urls with index.html', () => {
        const linkurl = "http://sub.domain.com/aaa/bbb/index.html";
        const pageurl = "http://sub.domain.com/aaa/bbb/ccc/index.html";
        const result = gettype(linkurl, pageurl);
        expect(result).toBe("samelevel");
    });

    it('should return "samelevel" for same level urls without index.html', () => {
        const linkurl = "http://sub.domain.com/aaa/bbb/";
        const pageurl = "http://sub.domain.com/aaa/bbb/ccc/";
        const result = gettype(linkurl, pageurl);
        expect(result).toBe("samelevel");
    });
});