import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype samelevel detection with trailing slash paths', () => {
  it('should return samelevel when link and page are at the same directory level with trailing slash on page', () => {
    // Both URLs have same number of path parts (part_count_diff == 0)
    // linkurl: /aaa/bbb/eee (3 parts), pageurl: /aaa/bbb/ (2 parts... wait)
    const result = gettype(
      "http://sub.domain.com/aaa/bbb/eee",
      "http://sub.domain.com/aaa/bbb/"
    );
    expect(result).toBe("samelevel");
  });
});