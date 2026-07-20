import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype url with equal subdomain lengths', () => {
    it('should return "subdomain" when linkurl and pageurl have equal subdomain lengths', () => {
        const linkurl = "http://sub.domain.com/path";
        const pageurl = "http://sub.domain.com/other";
        const result = gettype(linkurl, pageurl);
        expect(result).toBe("subdomain");
    });
});