import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function test', () => {
    it('should return "samelevel" for same level urls', () => {
        const linkurl = "http://sub.domain.com/aaa/bbb/ccc";
        const pageurl = "http://sub.domain.com/aaa/bbb/ddd";
        const result = gettype(linkurl, pageurl);
        expect(result).toBe("samelevel");
    });

    it('should return "sublevel" for sublevel urls', () => {
        const linkurl = "http://sub.domain.com/aaa/bbb/ccc/ddd";
        const pageurl = "http://sub.domain.com/aaa/bbb/ccc";
        const result = gettype(linkurl, pageurl);
        expect(result).toBe("sublevel");
    });

    it('should return "uplevel" for uplevel urls', () => {
        const linkurl = "http://sub.domain.com/aaa/bbb/ccc";
        const pageurl = "http://sub.domain.com/aaa/bbb/ccc/ddd";
        const result = gettype(linkurl, pageurl);
        expect(result).toBe("uplevel");
    });

    it.skip('should return "internal" for internal urls', () => {
        const linkurl = "http://sub.domain.com/aaa/bbb/ccc/eee";
        const pageurl = "http://sub.domain.com/aaa/bbb/ccc";
        const result = gettype(linkurl, pageurl);
        expect(result).toBe("internal");
    });

    it('should return "subdomain" for subdomain urls', () => {
        const linkurl = "http://sub.domain.com/aaa/bbb/ccc";
        const pageurl = "http://domain.com/aaa/bbb/ccc";
        const result = gettype(linkurl, pageurl);
        expect(result).toBe("subdomain");
    });

    it('should return "updomain" for updomain urls', () => {
        const linkurl = "http://domain.com/aaa/bbb/ccc";
        const pageurl = "http://sub.domain.com/aaa/bbb/ccc";
        const result = gettype(linkurl, pageurl);
        expect(result).toBe("updomain");
    });

    it('should return "external" for external urls', () => {
        const linkurl = "http://sub.domain.com/aaa/bbb/ccc";
        const pageurl = "http://anotherdomain.com/aaa/bbb/ccc";
        const result = gettype(linkurl, pageurl);
        expect(result).toBe("external");
    });
});