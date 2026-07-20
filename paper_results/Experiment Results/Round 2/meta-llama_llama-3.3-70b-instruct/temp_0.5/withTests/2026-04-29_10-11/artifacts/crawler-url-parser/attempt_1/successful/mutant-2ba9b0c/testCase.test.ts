import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', () => {
    it('should return "samelevel" for same level URLs', () => {
        const linkurl = "//sub.domain.com/aaa/bbb/ccc";
        const pageurl = "//sub.domain.com/aaa/bbb/ddd";
        const result = gettype(linkurl, pageurl);
        expect(result).toBe("samelevel");
    });

    it('should return "samelevel" for same level URLs with trailing slash', () => {
        const linkurl = "//sub.domain.com/aaa/bbb/ccc/";
        const pageurl = "//sub.domain.com/aaa/bbb/ddd/";
        const result = gettype(linkurl, pageurl);
        expect(result).toBe("samelevel");
    });
});