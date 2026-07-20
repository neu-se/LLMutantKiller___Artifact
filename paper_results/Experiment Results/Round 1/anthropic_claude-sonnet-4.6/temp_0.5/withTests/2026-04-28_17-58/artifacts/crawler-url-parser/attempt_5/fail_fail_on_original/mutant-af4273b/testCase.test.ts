import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse relative URL against base URL with special chars in query', () => {
  it('should handle base URL with encoded brackets in query string', () => {
    // querystring.stringify encodes '[' as '%5B', but raw search might have '['
    const result = parse("ddd", "http://www.stackoverflow.com/aaa/bbb?a[]=1");
    expect(result).not.toBeNull();
    // With parseQueryString=true: query={'a[]':'1'}, formatted as 'a%5B%5D=1'
    // With parseQueryString=false: search='?a[]=1', preserved as-is
    expect(result!.baseurl).toBe("http://www.stackoverflow.com/aaa/bbb?a%5B%5D=1");
  });
});