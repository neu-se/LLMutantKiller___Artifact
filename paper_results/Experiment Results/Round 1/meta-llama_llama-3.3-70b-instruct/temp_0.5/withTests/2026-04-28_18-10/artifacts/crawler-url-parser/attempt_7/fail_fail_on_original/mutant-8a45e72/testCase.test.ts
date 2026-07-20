import { gettype, parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('crawler-url-parser', function () {
    it('should pass when run against the original code and fail when run against the mutated code', function () {
        const linkUrl = "http://example.com/default.js";
        const pageUrl = "http://example.com/default.html";
        const originalPageUrl = parse(pageUrl);
        if (!originalPageUrl) {
            throw new Error('originalPageUrl is null');
        }
        const originalLinkUrl = parse(linkUrl);
        if (!originalLinkUrl) {
            throw new Error('originalLinkUrl is null');
        }
        const originalPageUrlPath = originalPageUrl.path.replace(/\/index\.[a-z]+$/, '/').replace(/\/default\.[a-z]+$/, '/');
        const originalLinkUrlPath = originalLinkUrl.path.replace(/\/index\.[a-z]+$/, '/').replace(/\/default\.[a-z]+$/, '/');
        const originalResult = gettype(linkUrl, pageUrl);
        expect(originalResult).toBe("samelevel");

        // Check if the mutated code returns a different result
        const mutatedPageUrlPath = originalPageUrl.path.replace(/\/index\.[a-z]+$/, '/').replace(/\/default\.[^a-z]+$/, '/');
        if (mutatedPageUrlPath !== originalPageUrlPath) {
            const mutatedResult = gettype(linkUrl, pageUrl);
            expect(mutatedResult).not.toBe("samelevel");
        } else {
            throw new Error('mutatedPageUrlPath is the same as originalPageUrlPath');
        }
    });
});