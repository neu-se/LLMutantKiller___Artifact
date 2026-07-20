import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype with default.html in link path', () => {
  it('should treat /aaa/bbb/default.html as uplevel relative to /aaa/bbb/ccc', () => {
    // The link URL ends with /default.html which should be normalized to /aaa/bbb/
    // Making it an "uplevel" relative to /aaa/bbb/ccc
    // Original regex /\/default\.[a-z]+$/ matches .html (multi-char extension)
    // Mutated regex /\/default\.[a-z]$/ does NOT match .html (requires single char)
    const result = gettype(
      'http://sub.domain.com/aaa/bbb/default.html',
      'http://sub.domain.com/aaa/bbb/ccc'
    );
    expect(result).toBe('uplevel');
  });
});