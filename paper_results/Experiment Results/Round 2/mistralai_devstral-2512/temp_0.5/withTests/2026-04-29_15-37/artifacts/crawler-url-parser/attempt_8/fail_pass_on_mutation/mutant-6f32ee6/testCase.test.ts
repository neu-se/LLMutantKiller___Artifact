import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype url with different subdomain lengths', () => {
    it('should return "updomain" when linkurl has fewer subdomains than pageurl', () => {
        const linkurl = "http://example.com/path";
        const pageurl = "http://mail.example.com/other";
        const result = gettype(linkurl, pageurl);
        expect(result).toBe("updomain");
    });
});