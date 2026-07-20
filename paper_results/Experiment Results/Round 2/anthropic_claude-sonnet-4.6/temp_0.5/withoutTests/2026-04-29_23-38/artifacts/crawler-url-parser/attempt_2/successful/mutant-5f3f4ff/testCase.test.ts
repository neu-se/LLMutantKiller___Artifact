import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('gettype', () => {
  it('should return internal when part_count_diff is -2 even if page path includes link path', () => {
    // link: /aaa/ (1 part), page: /aaa/bbb/ccc/ (3 parts) => part_count_diff = 1-3 = -2
    // pageurl_path includes linkurl_path => /aaa/bbb/ccc/ includes /aaa/
    // original: no else-if matches for -2, returns "internal"
    // mutated: else if (true) matches, checks includes => returns "uplevel"
    const result = gettype('http://example.com/aaa/', 'http://example.com/aaa/bbb/ccc/');
    expect(result).toBe('internal');
  });
});