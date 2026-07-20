import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse URL without query string url format', () => {
  it('should produce url ending with ? when no query string due to parseQueryString=true', () => {
    const result = parse("http://www.example.com/path");
    expect(result).not.toBeNull();
    // With parseQueryString=true: query={}, URL.format appends '?'
    // With parseQueryString=false: query=null, URL.format does not append '?'
    expect(result.url).toBe("http://www.example.com/path?");
  });
});