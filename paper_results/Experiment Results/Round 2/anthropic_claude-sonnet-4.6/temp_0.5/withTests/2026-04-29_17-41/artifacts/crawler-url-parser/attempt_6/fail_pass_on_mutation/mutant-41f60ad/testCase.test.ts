import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse URL with special characters in query string', () => {
  it('should handle query string with brackets correctly affecting querycount', () => {
    // URL with array-style query params - parseQueryString=true parses a[]=1&a[]=2 into object
    // URL.format with query object re-serializes differently than raw search string
    const result = parse("http://www.example.com/path?a%5B%5D=1&a%5B%5D=2");
    expect(result).not.toBeNull();
    // With parseQueryString=true, query={'a[]':['1','2']}, URL.format produces ?a%5B%5D=1&a%5B%5D=2
    // With parseQueryString=false, search='?a%5B%5D=1&a%5B%5D=2' used directly
    expect(result.url).toBe("http://www.example.com/path?a%5B%5D=1&a%5B%5D=2");
  });
});