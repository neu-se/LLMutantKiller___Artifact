import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', () => {
    it('should return "internal" for internal urls', () => {
        const linkurl = "//sub.domain.com/aaa/bbb/ccc/ddd";
        const pageurl = "//sub.domain.com/aaa/bbb/ccc";
        const result = gettype(linkurl, pageurl);
        expect(result).toBe("sublevel");
    });

    it('should not return "samelevel" for internal urls', () => {
        const linkurl = "//sub.domain.com/aaa/bbb/ccc/ddd";
        const pageurl = "//sub.domain.com/aaa/bbb/ccc";
        const result = gettype(linkurl, pageurl);
        expect(result).not.toBe("samelevel");
    });
});