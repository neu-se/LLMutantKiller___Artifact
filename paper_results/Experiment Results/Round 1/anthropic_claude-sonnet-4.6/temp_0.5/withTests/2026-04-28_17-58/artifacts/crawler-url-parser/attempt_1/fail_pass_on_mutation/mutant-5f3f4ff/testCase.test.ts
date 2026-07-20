import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype sublevel detection', () => {
  it('should return "sublevel" when link url has one more path segment than page url', () => {
    // linkurl has parts: aaa, bbb, ccc (3 parts)
    // pageurl has parts: aaa, bbb (2 parts)
    // part_count_diff = 1, so should be "sublevel"
    // In mutated code: enters else if (true) block, checks pageurl_path.includes(linkurl_path)
    // "/aaa/bbb".includes("/aaa/bbb/ccc") is false, so falls through to "internal" instead
    const result = gettype(
      "http://sub.domain.com/aaa/bbb/ccc",
      "http://sub.domain.com/aaa/bbb"
    );
    expect(result).toBe("sublevel");
  });
});