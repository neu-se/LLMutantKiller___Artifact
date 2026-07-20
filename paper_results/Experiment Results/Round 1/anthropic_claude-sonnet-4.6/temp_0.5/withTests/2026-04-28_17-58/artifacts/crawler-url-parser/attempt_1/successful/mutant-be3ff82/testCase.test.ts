import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype with index.html in page URL', () => {
  it('should treat page URL with /index.html as equivalent to directory when determining sublevel', () => {
    // pageurl has /index.html which should be normalized to /
    // linkurl is one level deeper, so it should be "sublevel"
    // Original: pageurl_path "/aaa/index.html" -> "/aaa/" after replace, linkurl "/aaa/bbb" is sublevel
    // Mutated: pageurl_path "/aaa/index.html" stays as-is (no match for [^a-z]+), so comparison fails -> "internal"
    const result = gettype(
      'http://example.com/aaa/bbb',
      'http://example.com/aaa/index.html'
    );
    expect(result).toBe('sublevel');
  });
});