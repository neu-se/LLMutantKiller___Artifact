import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype samelevel detection with trailing slash in page URL', () => {
  it('should return samelevel when link and page are at the same directory level with page URL having trailing slash', () => {
    // pageurl_path = "/aaa/bbb/" (trailing slash)
    // linkurl_path = "/aaa/ccc" (same level, different last segment)
    // part_count_diff = 0 (both have 2 non-empty parts: ["aaa","bbb"] and ["aaa","ccc"])
    // Original: pageurl_without_last_part for "/aaa/bbb/" = "/aaa"
    //           linkurl_without_last_part for "/aaa/ccc" = "/aaa"
    //           "/aaa" == "/aaa" => "samelevel"
    // Mutated:  pageurl_without_last_part for "/aaa/bbb/" = "/aaa/"
    //           linkurl_without_last_part for "/aaa/ccc" = "/aaa"
    //           "/aaa" != "/aaa/" => NOT "samelevel" => returns "internal"
    const result = gettype(
      "http://sub.domain.com/aaa/ccc",
      "http://sub.domain.com/aaa/bbb/"
    );
    expect(result).toBe("samelevel");
  });
});