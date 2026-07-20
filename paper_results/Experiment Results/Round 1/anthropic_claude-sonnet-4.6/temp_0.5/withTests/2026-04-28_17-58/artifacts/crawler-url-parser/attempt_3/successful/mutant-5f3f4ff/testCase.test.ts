import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype with part_count_diff of -2', () => {
  it('should return "internal" when link has two fewer path segments than page url', () => {
    // linkurl path: /aaa/ (parts: aaa = 1)
    // pageurl path: /aaa/bbb/ccc (parts: aaa, bbb, ccc = 3)
    // part_count_diff = 1 - 3 = -2
    // pageurl_path "/aaa/bbb/ccc".includes("/aaa/") => true
    // Original: part_count_diff != -1, falls through to "internal"
    // Mutated: else if (true) catches it, pageurl_path.includes(linkurl_path) is true => "uplevel"
    const result = gettype(
      "http://sub.domain.com/aaa/",
      "http://sub.domain.com/aaa/bbb/ccc"
    );
    expect(result).toBe("internal");
  });
});