import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', () => {
    it('should return "samelevel" for same level urls', () => {
        const linkurl = "http://sub.domain.com/aaa/bbb/ccc/index.html";
        const pageurl = "http://sub.domain.com/aaa/bbb/ddd/index.html";
        const result = gettype(linkurl, pageurl);
        expect(result).toBe("samelevel");
    });

    it('should return "samelevel" for same level urls without index.html', () => {
        const linkurl = "http://sub.domain.com/aaa/bbb/ccc";
        const pageurl = "http://sub.domain.com/aaa/bbb/ddd";
        const result = gettype(linkurl, pageurl);
        expect(result).toBe("samelevel");
    });

    it('should return "samelevel" for same level urls with default.html', () => {
        const linkurl = "http://sub.domain.com/aaa/bbb/ccc/default.html";
        const pageurl = "http://sub.domain.com/aaa/bbb/ddd/default.html";
        const result = gettype(linkurl, pageurl);
        expect(result).toBe("samelevel");
    });
});