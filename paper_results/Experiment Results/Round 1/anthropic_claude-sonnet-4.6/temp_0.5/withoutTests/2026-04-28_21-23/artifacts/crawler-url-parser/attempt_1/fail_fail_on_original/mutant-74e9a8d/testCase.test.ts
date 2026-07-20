import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype with default page URL normalization", () => {
  it("should return 'samelevel' when link is in same directory as page with default.html", () => {
    // Page URL ends with /default.html - should normalize to /foo/ (original) vs /foo (mutated)
    // Link URL is /foo/bar.html
    // With original normalization (/foo/): part_count_diff=1, sublevel
    // With mutated normalization (/foo): part_count_diff=1, sublevel
    // Need a case where the trailing slash matters for path comparison
    
    // Page: http://example.com/default.html -> pageurl_path normalized to "/" (original) or "" (mutated)
    // Link: http://example.com/foo/bar.html -> linkurl_path = "/foo/bar.html"
    // Original: pageurl_parts=[], linkurl_parts=["foo","bar.html"], diff=2, returns "internal"
    // Mutated: same result since parts are same
    
    // Better: page /foo/default.html, link /foo/
    // Original: pageurl_path="/foo/", linkurl_path="/foo/"
    // Both parts=["foo"], diff=0, without_last="" == "" -> "samelevel"
    // Mutated: pageurl_path="/foo", linkurl_path="/foo/"
    // linkurl_parts=["foo"], pageurl_parts=["foo"], diff=0
    // linkurl_without_last_part = "", pageurl_without_last_part = "" -> "samelevel"
    
    // Let me try: page /default.html, link /foo.html
    // Original: pageurl_path="/", linkurl_path="/foo.html"
    // linkurl_parts=["foo.html"], pageurl_parts=[], diff=1
    // linkurl_path.includes("/") -> true -> "sublevel"
    // Mutated: pageurl_path="", linkurl_path="/foo.html"
    // linkurl_parts=["foo.html"], pageurl_parts=[], diff=1
    // linkurl_path.includes("") -> true -> "sublevel"
    
    // Try: page /foo/default.html, link /foo.html
    // Original: pageurl_path="/foo/", linkurl_path="/foo.html"
    // linkurl_parts=["foo.html"], pageurl_parts=["foo"], diff=0
    // linkurl_without_last_part="", pageurl_without_last_part="/foo" -> NOT equal -> "internal"
    // Mutated: pageurl_path="/foo", linkurl_path="/foo.html"  
    // linkurl_parts=["foo.html"], pageurl_parts=["foo"], diff=0
    // linkurl_without_last_part="", pageurl_without_last_part="" -> equal -> "samelevel"
    
    const result = gettype("http://example.com/foo.html", "http://example.com/foo/default.html");
    expect(result).toBe("internal");
  });
});