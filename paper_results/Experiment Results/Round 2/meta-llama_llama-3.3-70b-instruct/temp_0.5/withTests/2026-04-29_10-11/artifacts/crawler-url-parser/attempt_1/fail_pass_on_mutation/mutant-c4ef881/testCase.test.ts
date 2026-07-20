import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', () => {
    it('should return "samelevel" for same level urls', () => {
        const linkurl = "//sub.domain.com/aaa/bbb/eee";
        const pageurl = "//sub.domain.com/aaa/bbb/ccc";
        const result = gettype(linkurl, pageurl);
        expect(result).toBe("samelevel");
    });

    it('should not return "samelevel" for all urls', () => {
        const linkurl = "//sub.domain.com/aaa/bbb/eee";
        const pageurl = "//sub.domain.com/aaa/bbb/ccc";
        const result = gettype(linkurl, pageurl);
        expect(result).not.toBe("sublevel");
    });
});