import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype mutation detection - index path replacement anchor", () => {
  it("should not replace /index.html when it appears in the middle of a path", () => {
    // The path "/index.html/subpage" contains "/index.html" NOT at the end
    // Original regex /\/index\.[a-z]+$/ (with $) will NOT match - path stays as "/index.html/subpage"
    // Mutated regex /\/index\.[a-z]+/ (without $) WILL match - path becomes "//subpage"
    
    // linkurl: http://example.com/index.html/subpage
    // pageurl: http://example.com/index.html/subpage
    // With original code: paths are equal after no replacement -> "samelevel"
    // With mutated code: linkurl_path becomes "//subpage", pageurl_path becomes "//subpage"
    //   but then split/filter gives ["subpage"] for both -> still "samelevel"
    
    // Better: use paths where the mutation causes different part counts
    // linkurl: http://example.com/index.html/subpage (2 parts: ["index.html", "subpage"])
    // pageurl: http://example.com/subpage (1 part: ["subpage"])
    // Original: no replacement, linkurl_parts=["index.html","subpage"], pageurl_parts=["subpage"]
    //   part_count_diff = 2-1 = 1, check if linkurl_path.includes(pageurl_path)
    //   "/index.html/subpage".includes("/subpage") -> true -> "sublevel"
    // Mutated: linkurl_path becomes "//subpage", pageurl_path stays "/subpage"
    //   linkurl_parts=["subpage"], pageurl_parts=["subpage"]
    //   part_count_diff = 1-1 = 0
    //   linkurl_without_last_part = "//subpage".replace(/(\/[^\/]*)[\/]?$/, "") = "/"
    //   pageurl_without_last_part = "/subpage".replace(/(\/[^\/]*)[\/]?$/, "") = ""
    //   "/" != "" -> not "samelevel" -> returns "internal"
    
    const result = gettype(
      "http://example.com/index.html/subpage",
      "http://example.com/subpage"
    );
    
    // Original code: "sublevel" (because /index.html/subpage includes /subpage with part_count_diff=1)
    // Mutated code: "internal" (because after replacement paths don't match samelevel criteria)
    expect(result).toBe("sublevel");
  });
});