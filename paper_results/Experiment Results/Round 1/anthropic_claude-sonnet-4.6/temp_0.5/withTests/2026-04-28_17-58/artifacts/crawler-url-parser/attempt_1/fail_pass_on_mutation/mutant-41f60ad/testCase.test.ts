import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse URL with query string', () => {
  it('should correctly count query parameters for a URL with multiple query params', () => {
    const result = parse("http://www.example.com/path?q1=val1&q2=val2");
    expect(result).not.toBeNull();
    expect(result.querycount).toBe(2);
    expect(result.search).toBe("?q1=val1&q2=val2");
    expect(result.url).toBe("http://www.example.com/path?q1=val1&q2=val2");
  });
});