import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', () => {
    it('should return correct type for same level urls', () => {
        const linkUrl = "http://sub.domain.com/aaa/bbb/ccc";
        const pageUrl = "http://sub.domain.com/aaa/bbb/ddd";
        const result = gettype(linkUrl, pageUrl);
        expect(result).toBe("samelevel");
    });

    it('should return correct type for sublevel urls', () => {
        const linkUrl = "http://sub.domain.com/aaa/bbb/ccc/ddd";
        const pageUrl = "http://sub.domain.com/aaa/bbb/ccc";
        const result = gettype(linkUrl, pageUrl);
        expect(result).toBe("sublevel");
    });

    it('should return correct type for uplevel urls', () => {
        const linkUrl = "http://sub.domain.com/aaa/bbb/ccc";
        const pageUrl = "http://sub.domain.com/aaa/bbb/ccc/ddd";
        const result = gettype(linkUrl, pageUrl);
        expect(result).toBe("uplevel");
    });

    it.skip('should return correct type for internal urls', () => {
        const linkUrl = "http://sub.domain.com/aaa/bbb/ccc/eee";
        const pageUrl = "http://sub.domain.com/aaa/bbb/ccc/fff";
        const result = gettype(linkUrl, pageUrl);
        expect(result).toBe("internal");
    });

    it.skip('should return correct type for external urls', () => {
        const linkUrl = "http://sub.domain.com/aaa/bbb/ccc";
        const pageUrl = "http://another.domain.com/aaa/bbb/ccc";
        const result = gettype(linkUrl, pageUrl);
        expect(result).toBe("external");
    });
});