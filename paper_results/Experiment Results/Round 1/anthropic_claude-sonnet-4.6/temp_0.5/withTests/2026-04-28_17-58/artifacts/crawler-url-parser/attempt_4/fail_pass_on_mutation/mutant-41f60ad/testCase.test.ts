import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse URL with array query parameters', () => {
  it('should handle URL with repeated query parameters', () => {
    const result = parse("http://www.example.com/path?a=1&a=2");
    expect(result).not.toBeNull();
    // With parseQueryString=true, query={a:['1','2']}, URL.format uses search="?a=1&a=2"
    // With parseQueryString=false, query="a=1&a=2", URL.format uses search="?a=1&a=2"  
    expect(result.url).toBe("http://www.example.com/path?a=1&a=2");
  });
});