import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype with default.html page URL normalization", () => {
  it("should return 'internal' when link /bar.html is compared to page /foo/default.html", () => {
    // Page URL: /foo/default.html -> normalized to "/foo/" (original) or "/foo" (mutated)
    // Link URL: /bar.html -> linkurl_path = "/bar.html"
    // Both have 1 path part, diff=0
    // Original: pageurl_without_last_part="/foo" != linkurl_without_last_part="" -> "internal"
    // Mutated: pageurl_without_last_part="" == linkurl_without_last_part="" -> "samelevel"
    const result = gettype("http://example.com/bar.html", "http://example.com/foo/default.html");
    expect(result).toBe("internal");
  });
});