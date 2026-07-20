import { extract, gettype, parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', () => {
    it('should return "samelevel" when linkurl_path and pageurl_path are the same', () => {
        const linkurl = parse("http://sub.domain.com/aaa/bbb/ccc");
        const pageurl = parse("http://sub.domain.com/aaa/bbb/ccc");
        expect(gettype(linkurl, pageurl)).toBe("samelevel");
    });

    it('should return "sublevel" when linkurl_path is a sublevel of pageurl_path', () => {
        const linkurl = parse("http://sub.domain.com/aaa/bbb/ccc/ddd");
        const pageurl = parse("http://sub.domain.com/aaa/bbb/ccc");
        expect(gettype(linkurl, pageurl)).toBe("sublevel");
    });

    it('should return "uplevel" when linkurl_path is an uplevel of pageurl_path', () => {
        const linkurl = parse("http://sub.domain.com/aaa/bbb");
        const pageurl = parse("http://sub.domain.com/aaa/bbb/ccc");
        expect(gettype(linkurl, pageurl)).toBe("uplevel");
    });

    it.skip('should return "internal" when linkurl and pageurl have the same host', () => {
        const linkurl = parse("http://sub.domain.com/aaa/bbb/ddd");
        const pageurl = parse("http://sub.domain.com/aaa/bbb/ccc");
        expect(gettype(linkurl, pageurl)).toBe("internal");
    });

    it('should return "subdomain" when linkurl and pageurl have the same domain but different subdomains', () => {
        const linkurl = parse("http://sub1.domain.com/aaa/bbb/ccc");
        const pageurl = parse("http://sub2.domain.com/aaa/bbb/ccc");
        expect(gettype(linkurl, pageurl)).toBe("subdomain");
    });

    it('should return "updomain" when linkurl is an updomain of pageurl', () => {
        const linkurl = parse("http://domain.com/aaa/bbb/ccc");
        const pageurl = parse("http://sub.domain.com/aaa/bbb/ccc");
        expect(gettype(linkurl, pageurl)).toBe("updomain");
    });

    it('should return "external" when linkurl and pageurl have different domains', () => {
        const linkurl = parse("http://domain1.com/aaa/bbb/ccc");
        const pageurl = parse("http://domain2.com/aaa/bbb/ccc");
        expect(gettype(linkurl, pageurl)).toBe("external");
    });
});