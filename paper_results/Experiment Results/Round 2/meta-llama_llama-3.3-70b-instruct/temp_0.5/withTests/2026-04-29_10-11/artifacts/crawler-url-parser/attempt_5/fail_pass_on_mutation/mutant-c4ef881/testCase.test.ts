import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', () => {
    it('should return "samelevel" only when linkurl and pageurl have the same path without the last part', () => {
        const linkurl = "//sub.domain.com/aaa/bbb/ccc";
        const pageurl = "//sub.domain.com/aaa/bbb/ddd";
        const result = gettype(linkurl, pageurl);
        expect(result).toBe("samelevel");
        
        const linkurl2 = "//sub.domain.com/aaa/bbb/ccc/eee";
        const result2 = gettype(linkurl2, pageurl);
        expect(result2).not.toBe("samelevel");
        
        const linkurl3 = "//sub.domain.com/aaa/bbb";
        const result3 = gettype(linkurl3, pageurl);
        expect(result3).toBe("uplevel");
    });
});