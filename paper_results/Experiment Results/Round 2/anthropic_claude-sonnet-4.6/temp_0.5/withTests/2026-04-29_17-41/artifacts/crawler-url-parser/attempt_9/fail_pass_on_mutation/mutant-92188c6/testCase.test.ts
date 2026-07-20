import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse URL with special characters in query', () => {
  it('should handle special characters in query string', () => {
    const result = parse("http://www.example.com/path?q=hello%20world");
    expect(result).not.toBeNull();
    expect(result!.search).toBe("?q=hello%20world");
    expect(result!.querycount).toBe(1);
  });
});