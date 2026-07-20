import { extract, gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', function () {
    it('should return "samelevel" for same level urls', function () {
        let linkurl = "http://sub.domain.com/aaa/bbb/ccc";
        let pageurl = "http://sub.domain.com/aaa/bbb/ddd";
        let result = gettype(linkurl, pageurl);
        expect(result).toBe("samelevel");
    });

    it('should return "sublevel" for sub level urls', function () {
        let linkurl = "http://sub.domain.com/aaa/bbb/ccc/ddd";
        let pageurl = "http://sub.domain.com/aaa/bbb/ccc";
        let result = gettype(linkurl, pageurl);
        expect(result).toBe("sublevel");
    });

    it('should return "uplevel" for up level urls', function () {
        let linkurl = "http://sub.domain.com/aaa/bbb";
        let pageurl = "http://sub.domain.com/aaa/bbb/ccc";
        let result = gettype(linkurl, pageurl);
        expect(result).toBe("uplevel");
    });

    it.skip('should return "internal" for internal urls', function () {
        let linkurl = "http://sub.domain.com/aaa/bbb/ddd";
        let pageurl = "http://sub.domain.com/aaa/bbb/ccc";
        let result = gettype(linkurl, pageurl);
        expect(result).toBe("internal");
    });

    it('should return "subdomain" for subdomain urls', function () {
        let linkurl = "http://sub1.domain.com/aaa/bbb/ccc";
        let pageurl = "http://sub2.domain.com/aaa/bbb/ccc";
        let result = gettype(linkurl, pageurl);
        expect(result).toBe("subdomain");
    });

    it('should return "updomain" for updomain urls', function () {
        let linkurl = "http://domain.com/aaa/bbb/ccc";
        let pageurl = "http://sub.domain.com/aaa/bbb/ccc";
        let result = gettype(linkurl, pageurl);
        expect(result).toBe("updomain");
    });

    it('should return "external" for external urls', function () {
        let linkurl = "http://domain1.com/aaa/bbb/ccc";
        let pageurl = "http://domain2.com/aaa/bbb/ccc";
        let result = gettype(linkurl, pageurl);
        expect(result).toBe("external");
    });
});