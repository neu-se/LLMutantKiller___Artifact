import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype with index.html in page URL', () => {
  it('should return sublevel when link is under the directory of a page with index.html', () => {
    // pageurl has /aaa/index.html which should normalize to /aaa/
    // linkurl has /aaa/bbb which is one level deeper than /aaa/
    // Original: pageurl_path = "/aaa/" (normalized), linkurl_path = "/aaa/bbb" -> sublevel
    // Mutated: pageurl_path = "/aaa/index.html" (not normalized), linkurl_path = "/aaa/bbb" -> samelevel
    const result = gettype(
      "http://example.com/aaa/bbb",
      "http://example.com/aaa/index.html"
    );
    expect(result).toBe("sublevel");
  });
});