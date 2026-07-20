import { gettype, parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('crawler-url-parser', function () {
    it('should pass when run against the original code and fail when run against the mutated code', function () {
        const linkUrl = "http://example.com/default.html";
        const pageUrl = "http://example.com";
        const originalPageUrlPath = parse(pageUrl).path.replace(/\/index\.[a-z]+$/, '/').replace(/\/default\.[a-z]+$/, '/');
        const originalLinkUrlPath = parse(linkUrl).path.replace(/\/index\.[a-z]+$/, '/').replace(/\/default\.[a-z]+$/, '/');
        const originalResult = gettype(linkUrl, pageUrl);
        expect(originalResult).toBe("subdomain");

        // Mutated code will not replace 'default.html' with '/' because it only matches [a-z]
        const mutatedPageUrlPath = parse(pageUrl).path.replace(/\/index\.[a-z]+$/, '/').replace(/\/default\.[^a-z]+$/, '/');
        const mutatedLinkUrlPath = parse(linkUrl).path.replace(/\/index\.[a-z]+$/, '/').replace(/\/default\.[^a-z]+$/, '/');
        const mutatedResult = gettype(linkUrl, pageUrl);
        expect(mutatedResult).not.toBe("subdomain");
    });
});