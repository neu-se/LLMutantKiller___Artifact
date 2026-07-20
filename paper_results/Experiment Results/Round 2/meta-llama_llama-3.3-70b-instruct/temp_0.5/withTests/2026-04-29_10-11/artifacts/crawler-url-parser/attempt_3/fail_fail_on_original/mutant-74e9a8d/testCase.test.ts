import { gettype, parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', () => {
    it('should return "internal" when linkurl_path and pageurl_path have the same host', () => {
        const linkurl = parse("http://sub.domain.com/aaa/bbb/index.html");
        const pageurl = parse("http://sub.domain.com/aaa/bbb/default.aspx");
        expect(gettype(linkurl, pageurl)).toBe("internal");
    });
});