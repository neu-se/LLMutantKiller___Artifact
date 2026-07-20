import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype with default.html in middle of page path', () => {
  it('should return uplevel when link is at a higher level than page with default.html in middle of path', () => {
    // Page URL has /default.html/ in the middle (not at end), so the $ anchor matters
    // Original: pageurl_path stays as /default.html/bbb (2 parts), linkurl_path = /bbb (1 part)
    //   part_count_diff = 1 - 2 = -1, pageurl_path.includes(linkurl_path) => true => "uplevel"
    // Mutated: pageurl_path becomes //bbb (1 part after filter), linkurl_path = /bbb (1 part)
    //   part_count_diff = 0, same level check => "samelevel"
    const result = gettype(
      'http://example.com/bbb',
      'http://example.com/default.html/bbb'
    );
    expect(result).toBe('uplevel');
  });
});