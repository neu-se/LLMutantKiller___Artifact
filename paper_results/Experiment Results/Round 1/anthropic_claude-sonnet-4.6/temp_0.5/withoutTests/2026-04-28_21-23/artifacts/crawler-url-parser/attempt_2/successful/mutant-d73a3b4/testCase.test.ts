import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype mutation detection", () => {
  it("should return sublevel when link path has /index.html in middle followed by page path segment", () => {
    // linkurl has /index.html in the middle (not at end of path)
    // Original regex has $ anchor: /\/index\.[a-z]+$/ won't match /index.html/sub
    // Mutated regex has no $ anchor: /\/index\.[a-z]+/ WILL match and replace /index.html in /index.html/sub
    
    const linkUrl = "http://example.com/index.html/sub";
    const pageUrl = "http://example.com/sub";
    
    // Original behavior:
    // linkurl_path = "/index.html/sub" (no replacement, $ anchor prevents match in middle)
    // pageurl_path = "/sub"
    // linkurl_parts = ["index.html", "sub"] (length 2)
    // pageurl_parts = ["sub"] (length 1)
    // part_count_diff = 1
    // linkurl_path.includes(pageurl_path) => "/index.html/sub".includes("/sub") => true
    // returns "sublevel"
    
    // Mutated behavior:
    // linkurl_path = "//sub" (replacement happens without $ anchor)
    // pageurl_path = "/sub"
    // linkurl_parts = ["sub"] (length 1)
    // pageurl_parts = ["sub"] (length 1)
    // part_count_diff = 0
    // linkurl_without_last_part = "" , pageurl_without_last_part = ""
    // "" == "" => returns "samelevel"
    
    const result = gettype(linkUrl, pageUrl);
    expect(result).toBe("sublevel");
  });
});