import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype mutation detection - default path normalization", () => {
  it("should correctly classify sublevel when pageurl contains /default.html in a non-terminal position", () => {
    // pageurl_path = "/default.html/subpage"
    // linkurl_path = "/default.html/subpage/child"
    // Original regex /\/default\.[a-z]+$/ does NOT match "/default.html/subpage" (not at end)
    // so pageurl_path stays "/default.html/subpage"
    // linkurl_parts.length - pageurl_parts.length = 3 - 2 = 1
    // linkurl_path.includes(pageurl_path) => "/default.html/subpage/child".includes("/default.html/subpage") => true => "sublevel"
    //
    // Mutated regex /\/default\.[a-z]+/ DOES match "/default.html/subpage" 
    // so pageurl_path becomes "//subpage"
    // pageurl_parts = ["subpage"], linkurl_parts = ["default.html", "subpage", "child"]
    // part_count_diff = 3 - 1 = 2 => falls through to "internal"
    
    const result = gettype(
      "http://example.com/default.html/subpage/child",
      "http://example.com/default.html/subpage"
    );
    
    expect(result).toBe("sublevel");
  });
});