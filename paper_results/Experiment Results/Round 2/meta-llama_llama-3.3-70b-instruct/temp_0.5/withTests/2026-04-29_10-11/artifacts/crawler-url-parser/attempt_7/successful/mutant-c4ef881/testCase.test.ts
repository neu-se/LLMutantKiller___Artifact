import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', () => {
    it('should return "samelevel" only when the paths without the last part are equal', () => {
        const linkurl = "//sub.domain.com/aaa/bbb/ccc";
        const pageurl = "//sub.domain.com/aaa/bbb/ddd";
        const result = gettype(linkurl, pageurl);
        expect(result).toBe("samelevel");

        const linkurl2 = "//sub.domain.com/aaa/bbb/ccc";
        const pageurl2 = "//sub.domain.com/aaa/bbb2/ddd";
        const result2 = gettype(linkurl2, pageurl2);
        expect(result2).not.toBe("samelevel");
    });
});