import { gettype, parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', () => {
    it('should return "internal" when linkurl_path and pageurl_path have the same host and the same path without the last part', () => {
        const linkurl = parse("http://sub.domain.com/aaa/bbb/ccc");
        const pageurl = parse("http://sub.domain.com/aaa/bbb/ddd");
        const linkurlPath = linkurl.path.replace(/\/index\.[a-z]+$/, '/').replace(/\/default\.[a-z]+$/, '/');
        const pageurlPath = pageurl.path.replace(/\/index\.[a-z]+$/, '/').replace(/\/default\.[a-z]+$/, '/');
        const linkurlWithoutLastPart = linkurlPath.replace(/(\/[^\/]*)[\/]?$/, "");
        const pageurlWithoutLastPart = pageurlPath.replace(/(\/[^\/]*)[\/]?$/, "");
        expect(linkurlWithoutLastPart).toBe(pageurlWithoutLastPart);
        expect(gettype(linkurl, pageurl)).toBe("internal");
    });
});