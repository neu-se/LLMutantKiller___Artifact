import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype subdomain comparison', () => {
    it('should return "subdomain" when linkurl and pageurl have same subdomain structure', () => {
        const linkUrl = "http://mail.google.com/path";
        const pageUrl = "http://www.google.com/other";
        const result = gettype(linkUrl, pageUrl);
        expect(result).toBe("subdomain");
    });
});