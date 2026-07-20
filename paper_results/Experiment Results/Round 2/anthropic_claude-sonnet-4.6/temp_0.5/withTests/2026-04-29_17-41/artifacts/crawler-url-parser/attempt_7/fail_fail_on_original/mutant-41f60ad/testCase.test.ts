import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse URL with empty query string', () => {
  it('should handle URL with trailing question mark', () => {
    const result = parse("http://www.example.com/path?");
    expect(result).not.toBeNull();
    expect(result.url).toBe("http://www.example.com/path");
  });
});