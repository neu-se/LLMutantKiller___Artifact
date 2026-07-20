import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse relative url with base url having valueless query param', () => {
  it('should handle base url with valueless query parameter', () => {
    const result = parse("ddd", "http://www.stackoverflow.com/aaa/bbb?flag");
    expect(result).not.toBeNull();
    // With parseQueryString=true (original): querystring.parse("flag") = {flag:''}, stringify = "flag="
    // So baseurl becomes "http://www.stackoverflow.com/aaa/bbb?flag="
    expect(result!.baseurl).toBe("http://www.stackoverflow.com/aaa/bbb?flag=");
  });
});