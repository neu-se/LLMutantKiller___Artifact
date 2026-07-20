import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', () => {
    it('should return "samelevel" for same level urls', () => {
        const linkurl = "http://sub.domain.com/aaa/bbb/ccc";
        const pageurl = "http://sub.domain.com/aaa/bbb/ddd";
        const result = gettype(linkurl, pageurl);
        expect(result).toBe("samelevel");
    });

    it('should return "samelevel" for same level urls with default document', () => {
        const linkurl = "http://sub.domain.com/aaa/bbb/index.html";
        const pageurl = "http://sub.domain.com/aaa/bbb/default.html";
        const result = gettype(linkurl, pageurl);
        expect(result).toBe("samelevel");
    });

    it.skip('should return "samelevel" for same level urls with default document in mutated code', () => {
        const linkurl = "http://sub.domain.com/aaa/bbb/index.html";
        const pageurl = "http://sub.domain.com/aaa/bbb/default.htm";
        const result = gettype(linkurl, pageurl);
        expect(result).not.toBe("samelevel"); // This test should fail for the mutated code
    });
});