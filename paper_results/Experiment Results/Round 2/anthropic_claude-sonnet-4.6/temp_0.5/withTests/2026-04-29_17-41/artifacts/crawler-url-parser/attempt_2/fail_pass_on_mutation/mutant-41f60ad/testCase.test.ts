import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse URL with encoded query string', () => {
  it('should preserve encoded characters in query string in the returned URL', () => {
    // With parseQueryString=true, URL.format uses query object which re-encodes values
    // With parseQueryString=false, URL.format uses raw search string
    const result = parse("http://www.example.com/path?q=hello%20world");
    expect(result).not.toBeNull();
    expect(result.url).toBe("http://www.example.com/path?q=hello%20world");
  });
});