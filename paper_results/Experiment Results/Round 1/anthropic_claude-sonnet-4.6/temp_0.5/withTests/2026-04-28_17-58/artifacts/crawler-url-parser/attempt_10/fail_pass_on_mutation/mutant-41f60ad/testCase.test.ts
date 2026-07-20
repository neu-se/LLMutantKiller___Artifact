import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse URL with query string re-encoding', () => {
  it('should handle URL where query object re-encodes differently than search string', () => {
    // With parseQueryString=true: query={q:'a b'} (space decoded from +)
    // URL.format uses search="?q=a+b" directly
    // With parseQueryString=false: query="q=a+b", URL.format uses search="?q=a+b"
    // Both same... unless URL.format uses query object instead
    const result = parse("http://www.example.com/path?q=a+b");
    expect(result).not.toBeNull();
    expect(result.url).toBe("http://www.example.com/path?q=a+b");
  });
});