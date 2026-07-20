import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype with default.html page url normalization', () => {
  it('should return sublevel when link is one level deeper than page with default.html path', () => {
    // pageurl has /default.html which should be normalized to /
    // Original: pageurl_path = "/aaa/" (after normalization), linkurl_path = "/aaa/bbb"
    //   part_count_diff = 1, linkurl_path.includes(pageurl_path) => "sublevel"
    // Mutated: pageurl_path = "/aaa/default.html" (not normalized, 'html' is 4 chars, regex needs +)
    //   part_count_diff = 0, paths differ => "internal"
    const result = gettype(
      "http://example.com/aaa/bbb",
      "http://example.com/aaa/default.html"
    );
    expect(result).toBe("sublevel");
  });
});