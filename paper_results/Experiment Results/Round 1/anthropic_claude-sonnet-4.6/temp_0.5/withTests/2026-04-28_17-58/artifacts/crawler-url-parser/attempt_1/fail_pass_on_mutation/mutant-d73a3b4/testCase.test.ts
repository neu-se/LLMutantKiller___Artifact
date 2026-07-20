import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype with index in middle of path', () => {
  it('should return internal when link has /index.html/ in the middle of the path (not at end)', () => {
    // link path: /aaa/index.html/bbb - /index.html is NOT at end, so original regex should NOT replace it
    // page path: /aaa/bbb
    // Original: link parts = ["aaa", "index.html", "bbb"] (3), page parts = ["aaa", "bbb"] (2) -> diff=1, but linkurl_path.includes(pageurl_path) is false -> "internal"
    // Mutated: link path becomes /aaa//bbb -> parts = ["aaa", "bbb"] (2), page parts = ["aaa", "bbb"] (2) -> diff=0 -> "samelevel"
    const result = gettype(
      "http://example.com/aaa/index.html/bbb",
      "http://example.com/aaa/bbb"
    );
    expect(result).toBe("internal");
  });
});