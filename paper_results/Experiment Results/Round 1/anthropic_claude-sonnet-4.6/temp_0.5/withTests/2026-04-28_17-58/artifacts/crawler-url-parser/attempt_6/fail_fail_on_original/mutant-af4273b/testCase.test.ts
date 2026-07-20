import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse relative URL against base URL with valueless query param', () => {
  it('should handle base URL with valueless query parameter', () => {
    const result = parse("ddd", "http://www.stackoverflow.com/aaa/bbb?flag");
    expect(result).not.toBeNull();
    // With parseQueryString=true: query={flag:''}, querystring.stringify -> 'flag=' -> baseurl has '?flag='
    // With parseQueryString=false: search='?flag' preserved -> baseurl has '?flag'
    expect(result!.baseurl).toBe("http://www.stackoverflow.com/aaa/bbb?flag=");
  });
});