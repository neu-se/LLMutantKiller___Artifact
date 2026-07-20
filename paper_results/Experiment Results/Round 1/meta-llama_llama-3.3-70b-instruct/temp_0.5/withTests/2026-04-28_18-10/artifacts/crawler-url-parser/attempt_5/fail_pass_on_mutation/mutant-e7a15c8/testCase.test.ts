import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype', () => {
    it('should return "samelevel" when linkurl and pageurl have the same path', () => {
        const linkurl = "//sub.domain.com/aaa/bbb/ccc";
        const pageurl = "//sub.domain.com/aaa/bbb/ccc";
        linkurl.replace(/(\/[^\/]*)[\/]?$/, "");
        pageurl.replace(/(\/[^\/]*)[^\/]?$/, "");
        const result = gettype(linkurl, pageurl);
        expect(result).toBe("samelevel");
    });
});