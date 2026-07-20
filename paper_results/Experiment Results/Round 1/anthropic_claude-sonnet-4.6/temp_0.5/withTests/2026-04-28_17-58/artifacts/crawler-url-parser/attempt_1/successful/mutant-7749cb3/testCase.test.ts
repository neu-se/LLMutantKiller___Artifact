import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype with default in middle of pageurl path', () => {
  it('should correctly classify samelevel when pageurl contains /default.html in the middle of the path', () => {
    // pageurl has /default.html in the middle (not at end)
    // linkurl and pageurl are at the same level
    // Original: pageurl_path = "/default.html/subpage" stays as-is ($ anchor prevents replacement)
    // Mutated: pageurl_path = "/default.html/subpage" becomes "//subpage" (no $ anchor, replaces mid-path)
    // This changes the path comparison and thus the returned type
    const linkurl = "http://example.com/default.html/other";
    const pageurl = "http://example.com/default.html/subpage";
    
    // With original code:
    // linkurl_path = "/default.html/other" (no replacement since not at end)
    // pageurl_path = "/default.html/subpage" (no replacement since not at end)
    // linkurl_parts = ["default.html", "other"], pageurl_parts = ["default.html", "subpage"]
    // part_count_diff = 0, linkurl_without_last_part = "/default.html", pageurl_without_last_part = "/default.html"
    // => "samelevel"
    
    // With mutated code:
    // linkurl_path = "/default.html/other" (linkurl uses $ so no change)
    // pageurl_path = "//subpage" (mutated regex replaces /default.html mid-path)
    // pageurl_parts = ["subpage"]
    // part_count_diff = 2-1 = 1
    // linkurl_path.includes(pageurl_path) => "/default.html/other".includes("//subpage") => false
    // => "internal"
    
    const result = gettype(linkurl, pageurl);
    expect(result).toBe("samelevel");
  });
});