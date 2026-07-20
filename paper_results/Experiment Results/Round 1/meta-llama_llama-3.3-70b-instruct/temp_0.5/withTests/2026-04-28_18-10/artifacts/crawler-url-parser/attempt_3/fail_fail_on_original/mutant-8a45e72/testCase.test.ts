import { gettype, parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('crawler-url-parser', function () {
    it('should pass when run against the original code and fail when run against the mutated code', function () {
        const linkUrl = "http://example.com/default.html";
        const pageUrl = "http://example.com/default.aspx";
        const originalPageUrl = parse(pageUrl);
        if (!originalPageUrl) {
            throw new Error('originalPageUrl is null');
        }
        const originalLinkUrl = parse(linkUrl);
        if (!originalLinkUrl) {
            throw new Error('originalLinkUrl is null');
        }
        const originalResult = gettype(linkUrl, pageUrl);
        expect(originalResult).toBe("samelevel");

        const mutatedResult = gettype(linkUrl, pageUrl);
        expect(mutatedResult).not.toBe("samelevel");
    });
});