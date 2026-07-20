import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse relative url baseurl field with query string in base', () => {
  it('should set baseurl correctly when base url has array-like query params', () => {
    // With parseQueryString=true, URL.parse parses "a[]=1&a[]=2" into query object
    // URL.format then re-serializes it, potentially changing the format
    const result = parse("ddd", "http://www.stackoverflow.com/aaa/bbb?a%5B%5D=1&a%5B%5D=2");
    expect(result).not.toBeNull();
    expect(result!.baseurl).toBe("http://www.stackoverflow.com/aaa/bbb?a%5B%5D=1&a%5B%5D=2");
  });
});