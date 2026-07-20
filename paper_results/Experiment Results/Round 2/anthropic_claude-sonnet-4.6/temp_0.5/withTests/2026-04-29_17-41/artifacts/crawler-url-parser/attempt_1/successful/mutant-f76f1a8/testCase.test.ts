import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype with default.htm page url normalization', () => {
  it('should treat page url ending in /default.htm as equivalent to the directory for level comparison', () => {
    // pageurl has path /aaa/default.htm which should normalize to /aaa/
    // linkurl has path /aaa/bbb which should be "sublevel" relative to /aaa/
    // With original code: pageurl_path becomes /aaa/ (3 parts: 'aaa'), linkurl_path is /aaa/bbb (2 parts: 'aaa','bbb')
    // part_count_diff = 2 - 1 = 1, and linkurl_path includes pageurl_path => "sublevel"
    // With mutated code: /default.htm has 3-char extension so regex /\/default\.[a-z]$/ won't match
    // pageurl_path stays /aaa/default.htm (2 parts: 'aaa','default.htm'), linkurl_path is /aaa/bbb (2 parts)
    // part_count_diff = 0, then checks if without-last-part are equal: /aaa == /aaa => "samelevel"
    const result = gettype(
      'http://example.com/aaa/bbb',
      'http://example.com/aaa/default.htm'
    );
    expect(result).toBe('sublevel');
  });
});