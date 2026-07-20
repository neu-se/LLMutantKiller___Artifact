import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype subdomain comparison', () => {
    it('should return "updomain" when linkurl has fewer subdomains than pageurl', () => {
        const linkUrl = "http://domain.com/path";
        const pageUrl = "http://sub.domain.com/other";
        const result = gettype(linkUrl, pageUrl);
        expect(result).toBe("updomain");
    });
});