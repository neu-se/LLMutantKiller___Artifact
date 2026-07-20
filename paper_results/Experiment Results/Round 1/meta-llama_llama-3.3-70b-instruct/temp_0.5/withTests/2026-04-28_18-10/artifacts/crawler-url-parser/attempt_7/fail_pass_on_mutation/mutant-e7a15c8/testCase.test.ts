import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype', () => {
    it('should return correct result when linkurl and pageurl have the same path', () => {
        const linkurl = "//sub.domain.com/aaa/bbb/ccc";
        const pageurl = "//sub.domain.com/aaa/bbb/ccc";
        const result = gettype(linkurl, pageurl);
        expect(result).toBe("samelevel");
        const linkurl_without_last_part = linkurl.replace(/(\/[^\/]*)[\/]?$/, "");
        const pageurl_without_last_part = pageurl.replace(/(\/[^\/]*)[^\/]?$/, "");
        expect(linkurl_without_last_part).toBe(pageurl_without_last_part);
    });
});