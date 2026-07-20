import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse relative URL against base URL with empty query string', () => {
  it('should handle base URL with empty query string - baseurl should not have trailing question mark', () => {
    const result = parse("ddd", "http://www.stackoverflow.com/aaa/bbb?");
    expect(result).not.toBeNull();
    // With parseQueryString=true: empty query={}, search=null -> URL.format omits '?'
    // With parseQueryString=false: search='?' -> URL.format includes '?'
    expect(result.baseurl).toBe("http://www.stackoverflow.com/aaa/bbb");
  });
});