import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype url with equal subdomain lengths', () => {
    it('should return "updomain" when linkurl and pageurl have equal subdomain lengths', () => {
        const linkurl = "http://mail.example.com/path";
        const pageurl = "http://mail.example.com/other";
        const result = gettype(linkurl, pageurl);
        expect(result).toBe("updomain");
    });
});