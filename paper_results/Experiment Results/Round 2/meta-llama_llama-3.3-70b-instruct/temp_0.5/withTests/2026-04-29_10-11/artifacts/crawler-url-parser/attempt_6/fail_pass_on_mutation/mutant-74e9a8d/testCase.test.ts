import { gettype, parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', () => {
    it('should return "samelevel" when linkurl_path and pageurl_path have the same host and the same path without the last part, and the last parts are index.html and default.html respectively', () => {
        const linkurl = parse("http://sub.domain.com/aaa/bbb/index.html");
        const pageurl = parse("http://sub.domain.com/aaa/bbb/default.html");
        expect(gettype(linkurl, pageurl)).toBe("samelevel");
    });
});