import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype with index.html page url normalization', () => {
  it('should return sublevel when link is under a directory represented by index.html page url', () => {
    // pageurl has /aaa/index.html which should normalize to /aaa/
    // linkurl has /aaa/bbb which is one level deeper than /aaa/
    // Original code normalizes pageurl_path /aaa/index.html -> /aaa/ via /\/index\.[a-z]+$/
    // Mutated code uses /\/index\.[a-z]$/ which won't match "html" (multi-char extension)
    const result = gettype(
      'http://example.com/aaa/bbb',
      'http://example.com/aaa/index.html'
    );
    expect(result).toBe('sublevel');
  });
});