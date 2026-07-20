import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype samelevel detection", () => {
  it("should return samelevel for two URLs at the same directory level with trailing slashes", () => {
    // Both URLs are at /aaa/ level, just different last segments
    // linkurl: http://example.com/aaa/bbb/
    // pageurl: http://example.com/aaa/ccc/
    // Both should have the same parent path /aaa/, so they are "samelevel"
    // Original: linkurl_without_last_part = "/aaa/" -> "/aaa" (removes /bbb/)
    //           pageurl_without_last_part = "/aaa/" -> "/aaa" (removes /ccc/)
    //           "/aaa" == "/aaa" => "samelevel"
    // Mutated:  linkurl_without_last_part = "/aaa/" -> "/aaa/" (removes /bbb but not /)
    //           pageurl_without_last_part = "/aaa/" -> "/aaa/" (removes /ccc but not /)
    //           "/aaa/" == "/aaa/" => still "samelevel" -- hmm

    // Let me try: linkurl /aaa/bbb (no trailing slash), pageurl /aaa/ccc (no trailing slash)
    // part_count_diff = 0
    // Original: "/aaa/bbb".replace(/(\/[^\/]*)[\/]?$/, "") = "/aaa"
    //           "/aaa/ccc".replace(/(\/[^\/]*)[\/]?$/, "") = "/aaa"
    //           "/aaa" == "/aaa" => "samelevel"
    // Mutated:  "/aaa/bbb".replace(/(\/[^\/]*)[^\/]?$/, "") 
    //           group matches "/bbb", then [^\/]? tries to match after "b" - nothing, so same result "/aaa"
    // Hmm, same result for non-trailing slash too

    // The key difference: path ending with trailing slash like "/aaa/"
    // part_count_diff for /aaa/ vs /aaa/bbb: parts of /aaa/ = ["aaa"], parts of /aaa/bbb = ["aaa","bbb"]
    // diff = 1, not 0, so won't hit the samelevel branch

    // Let me reconsider: /aaa/bbb/ has parts ["aaa","bbb"], /aaa/ccc/ has parts ["aaa","ccc"]
    // diff = 0, enters the if block
    // Original: "/aaa/bbb/".replace(/(\/[^\/]*)[\/]?$/, "") 
    //   group (\/[^\/]*) matches "/bbb", then [\/]? matches "/", removes "/bbb/" -> "/aaa"
    // Mutated: "/aaa/bbb/".replace(/(\/[^\/]*)[^\/]?$/, "")
    //   group (\/[^\/]*) matches "/bbb", then [^\/]? tries to match "/" but "/" IS a slash so [^\/] won't match, matches empty
    //   removes "/bbb" -> "/aaa/"
    // So original gives "/aaa", mutated gives "/aaa/"
    // "/aaa" != "/aaa/" so samelevel check fails in mutated version!
    
    const result = gettype("http://example.com/aaa/bbb/", "http://example.com/aaa/ccc/");
    expect(result).toBe("samelevel");
  });
});