import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype subdomain comparison', () => {
    it('should return "subdomain" when linkurl and pageurl have equal subdomain lengths', () => {
        const linkUrl = "http://sub.domain.com/path";
        const pageUrl = "http://sub.domain.com/other";
        const result = gettype(linkUrl, pageUrl);
        expect(result).toBe("subdomain");
    });
});