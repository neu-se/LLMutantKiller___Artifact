import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype mutation detection", () => {
  it("should correctly handle /index.html only at end of path, not in middle", () => {
    // linkurl has /index.html in the middle (not at end)
    // Original regex has $ anchor, so it won't replace /index.html/sub
    // Mutated regex has no $ anchor, so it WILL replace /index.html in /index.html/sub
    // This causes different path comparison results and different type classification
    
    const linkUrl = "http://example.com/index.html/sub";
    const pageUrl = "http://example.com/page";
    
    // Original behavior:
    // linkurl_path = "/index.html/sub" (no replacement, $ anchor prevents match)
    // pageurl_path = "/page"
    // linkurl_parts = ["index.html", "sub"] (length 2)
    // pageurl_parts = ["page"] (length 1)
    // part_count_diff = 1
    // linkurl_path.includes(pageurl_path) => "/index.html/sub".includes("/page") => false
    // returns "internal"
    
    // Mutated behavior:
    // linkurl_path = "//sub" (replacement happens without $ anchor)
    // pageurl_path = "/page"
    // linkurl_parts = ["sub"] (length 1)
    // pageurl_parts = ["page"] (length 1)
    // part_count_diff = 0
    // linkurl_without_last_part = "//sub".replace(/(\/[^\/]*)[\/]?$/, "") = ""
    // pageurl_without_last_part = "/page".replace(/(\/[^\/]*)[\/]?$/, "") = ""
    // "" == "" => returns "samelevel"
    
    const result = gettype(linkUrl, pageUrl);
    expect(result).toBe("internal");
  });
});