import { gettype, parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('crawler-url-parser', function () {
    it('should pass when run against the original code and fail when run against the mutated code', function () {
        const linkUrl = "http://example.com/index.js";
        const pageUrl = "http://example.com/index.html";
        const originalResult = gettype(linkUrl, pageUrl);
        expect(originalResult).toBe("samelevel");

        // Mutated code should return "internal" instead of "samelevel"
        const mutatedResult = gettype("http://example.com/default.js", "http://example.com/default.js");
        expect(mutatedResult).not.toBe("samelevel");
    });
});