import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype url with same subdomain length', () => {
    it('should return "subdomain" when linkurl and pageurl have same subdomain length', () => {
        const linkurl = "http://sub.example.com/path";
        const pageurl = "http://sub.example.com/other";
        const result = gettype(linkurl, pageurl);
        expect(result).toBe("subdomain");
    });
});