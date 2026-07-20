import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse relative url with base url', () => {
  it('should correctly set baseurl for relative url resolution', () => {
    // Use a base URL where querystring.stringify output differs from raw search
    // querystring.parse("a%20b=1") = {"a b": "1"}, stringify = "a%20b=1" (same)
    // querystring.parse("a=1&a=2") = {a:['1','2']}, stringify = "a=1&a=2" (same)
    // Let's try: querystring.parse("a=1;b=2") - semicolon is a separator in some implementations
    const result = parse("/ddd", "http://www.stackoverflow.com/aaa/bbb?a=1;b=2");
    expect(result).not.toBeNull();
    // If search is preserved (both true and false keep search), baseurl should be same
    // But if parseQueryString=true sets search=null, then URL.format uses query object
    // querystring.parse("a=1;b=2") might parse differently
    expect(result!.baseurl).toBe("http://www.stackoverflow.com/aaa/bbb?a=1;b=2");
  });
});