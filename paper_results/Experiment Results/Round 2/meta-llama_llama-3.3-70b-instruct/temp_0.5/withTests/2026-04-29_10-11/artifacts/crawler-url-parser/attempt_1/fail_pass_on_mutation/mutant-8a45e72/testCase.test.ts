import { extract, parse, gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function test', function () {
    it('should pass for sublevel urls', function () {
        let linkurl = "http://sub.domain.com/aaa/bbb/ccc";
        let pageurl = "http://sub.domain.com/aaa/bbb/";
        let res = gettype(linkurl, pageurl);
        expect(res).toBe("sublevel");
    });

    it('should pass for uplevel urls', function () {
        let linkurl = "http://sub.domain.com/aaa/bbb/";
        let pageurl = "http://sub.domain.com/aaa/bbb/ccc";
        let res = gettype(linkurl, pageurl);
        expect(res).toBe("uplevel");
    });

    it('should pass for samelevel urls', function () {
        let linkurl = "http://sub.domain.com/aaa/bbb/ddd";
        let pageurl = "http://sub.domain.com/aaa/bbb/ccc";
        let res = gettype(linkurl, pageurl);
        expect(res).toBe("samelevel");
    });

    it('should pass for internal urls', function () {
        let linkurl = "http://sub.domain.com/aaa/bbb/ddd/eee";
        let pageurl = "http://sub.domain.com/aaa/bbb/ccc";
        let res = gettype(linkurl, pageurl);
        expect(res).toBe("internal");
    });

    it('should pass for subdomain urls', function () {
        let linkurl = "http://sub2.domain.com/aaa/bbb/ccc";
        let pageurl = "http://sub.domain.com/aaa/bbb/ccc";
        let res = gettype(linkurl, pageurl);
        expect(res).toBe("subdomain");
    });

    it('should pass for updomain urls', function () {
        let linkurl = "http://domain.com/aaa/bbb/ccc";
        let pageurl = "http://sub.domain.com/aaa/bbb/ccc";
        let res = gettype(linkurl, pageurl);
        expect(res).toBe("updomain");
    });

    it('should pass for external urls', function () {
        let linkurl = "http://otherdomain.com/aaa/bbb/ccc";
        let pageurl = "http://sub.domain.com/aaa/bbb/ccc";
        let res = gettype(linkurl, pageurl);
        expect(res).toBe("external");
    });
});