import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse relative url with base url ending in bare question mark', () => {
  it('should handle base url with trailing question mark', () => {
    const result = parse("ddd", "http://www.stackoverflow.com/aaa/bbb?");
    expect(result).not.toBeNull();
    // With parseQueryString=true (original): URL.format drops the bare '?', baseurl has no trailing '?'
    expect(result!.baseurl).toBe("http://www.stackoverflow.com/aaa/bbb");
  });
});