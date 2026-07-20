import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype', () => {
    it('should return "samelevel" when linkurl and pageurl have the same path without the last part', () => {
        const linkurl = "//sub.domain.com/aaa/bbb/ccc";
        const pageurl = "//sub.domain.com/aaa/bbb/ddd";
        const linkurl_without_last_part = linkurl.replace(/(\/[^\/]*)[\/]?$/, "");
        const pageurl_without_last_part = pageurl.replace(/(\/[^\/]*)[^\/]?$/, "");
        const result = gettype(linkurl, pageurl);
        expect(linkurl_without_last_part).toBe(pageurl_without_last_part);
    });
});