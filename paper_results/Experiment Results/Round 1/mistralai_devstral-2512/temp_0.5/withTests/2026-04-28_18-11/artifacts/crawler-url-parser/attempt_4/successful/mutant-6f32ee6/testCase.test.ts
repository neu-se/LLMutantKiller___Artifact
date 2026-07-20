import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype subdomain comparison', () => {
    it('should return "subdomain" when linkurl has same number of subdomains as pageurl', () => {
        const linkUrl = "http://a.b.c.example.com/path";
        const pageUrl = "http://x.y.z.example.com/other";
        const result = gettype(linkUrl, pageUrl);
        expect(result).toBe("subdomain");
    });
});