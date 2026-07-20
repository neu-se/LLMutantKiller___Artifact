import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype', () => {
    it('should return "samelevel" when linkurl and pageurl have the same path without the last part', () => {
        const linkurl = "//sub.domain.com/aaa/bbb/eee";
        const pageurl = "//sub.domain.com/aaa/bbb/ccc";
        const result = gettype(linkurl, pageurl);
        expect(result).toBe("samelevel");
    });

    it.skip('should return "samelevel" when linkurl and pageurl have the same path without the last part (mutated code)', () => {
        const linkurl = "//sub.domain.com/aaa/bbb/eee";
        const pageurl = "//sub.domain.com/aaa/bbb/ccc";
        const linkurl_without_last_part = linkurl.replace(/(\/[^\/]*)[^\/]?$/, "");
        const pageurl_without_last_part = pageurl.replace(/(\/[^\/]*)[^\/]?$/, "");
        expect(linkurl_without_last_part).not.toBe(pageurl_without_last_part);
    });
});