import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse URL with empty query string', () => {
  it('should handle empty query string correctly', () => {
    const result = parse("http://www.example.com/path?");
    expect(result).not.toBeNull();
    expect(result!.querycount).toBe(0);
    expect(result!.search).toBe("?");
  });
});