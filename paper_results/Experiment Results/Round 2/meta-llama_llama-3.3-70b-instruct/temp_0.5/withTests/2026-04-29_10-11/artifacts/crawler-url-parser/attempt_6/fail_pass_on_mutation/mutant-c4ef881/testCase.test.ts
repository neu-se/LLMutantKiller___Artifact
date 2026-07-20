import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', () => {
    it('should return different results for different input urls', () => {
        const linkurl1 = "//sub.domain.com/aaa/bbb/ccc";
        const linkurl2 = "//sub.domain.com/aaa/bbb/ccc/ddd";
        const pageurl = "//sub.domain.com/aaa/bbb/ccc";
        const result1 = gettype(linkurl1, pageurl);
        const result2 = gettype(linkurl2, pageurl);
        expect(result1).toBe("samelevel");
        expect(result2).toBe("sublevel");
    });
});