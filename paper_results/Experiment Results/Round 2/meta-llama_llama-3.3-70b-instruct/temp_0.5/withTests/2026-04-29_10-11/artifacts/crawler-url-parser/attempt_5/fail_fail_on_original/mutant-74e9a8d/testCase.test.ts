import { gettype, parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', () => {
    it('should return "internal" when linkurl_path and pageurl_path have the same host and the linkurl_path does not end with index.html or default.html', () => {
        const linkurl = parse("http://sub.domain.com/aaa/bbb/ccc");
        const pageurl = parse("http://sub.domain.com/aaa/bbb/ddd");
        expect(gettype(linkurl, pageurl)).toBe("internal");
    });
});