import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype mutation detection', () => {
  it('should return "internal" when link path is 2 levels above page path (part_count_diff == -2)', () => {
    // link: /aaa (1 part), page: /aaa/bbb/ccc (3 parts) => diff = 1 - 3 = -2
    // Original: -2 != -1, skip uplevel check, return "internal"
    // Mutated: else if(true) runs, pageurl "/aaa/bbb/ccc".includes("/aaa") => true => returns "uplevel"
    const result = gettype("http://sub.domain.com/aaa", "http://sub.domain.com/aaa/bbb/ccc");
    expect(result).toBe("internal");
  });
});