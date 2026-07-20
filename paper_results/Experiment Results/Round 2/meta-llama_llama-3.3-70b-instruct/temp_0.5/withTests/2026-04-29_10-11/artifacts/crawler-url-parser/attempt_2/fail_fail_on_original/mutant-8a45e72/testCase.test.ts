import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function test', function () {
    it('should pass for samelevel urls with default document', function () {
        let linkurl = "http://sub.domain.com/aaa/bbb/index.html";
        let pageurl = "http://sub.domain.com/aaa/bbb/ccc";
        let res = gettype(linkurl, pageurl);
        expect(res).toBe("samelevel");
    });

    it('should pass for samelevel urls with non-default document', function () {
        let linkurl = "http://sub.domain.com/aaa/bbb/default.aspx";
        let pageurl = "http://sub.domain.com/aaa/bbb/ccc";
        let res = gettype(linkurl, pageurl);
        expect(res).toBe("samelevel");
    });
});