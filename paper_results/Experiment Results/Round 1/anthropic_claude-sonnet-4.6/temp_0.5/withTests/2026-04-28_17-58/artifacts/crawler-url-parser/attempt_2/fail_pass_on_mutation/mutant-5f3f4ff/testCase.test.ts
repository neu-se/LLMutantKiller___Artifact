import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype uplevel detection', () => {
  it('should return "uplevel" when link url has one fewer path segment and page path includes link path', () => {
    // linkurl path: /aaa/bbb/ (parts: aaa, bbb = 2)
    // pageurl path: /aaa/bbb/ccc (parts: aaa, bbb, ccc = 3)
    // part_count_diff = 2 - 3 = -1
    // pageurl_path includes linkurl_path: "/aaa/bbb/ccc".includes("/aaa/bbb/") => true
    // Original: enters part_count_diff == -1 branch, returns "uplevel"
    // Mutated: else if (true) is consumed by part_count_diff == 1 case,
    //          so part_count_diff == -1 falls through to "internal"
    const result = gettype(
      "http://sub.domain.com/aaa/bbb/",
      "http://sub.domain.com/aaa/bbb/ccc"
    );
    expect(result).toBe("uplevel");
  });
});