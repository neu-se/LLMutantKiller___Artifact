import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse relative URL with base containing query string', () => {
  it('should correctly handle query string when resolving relative URL', () => {
    // Relative URL "ddd" resolved against base with query string
    // The first parsedUrl.query being {} vs null affects URL.resolve behavior
    const result = parse("ddd", "http://www.example.com/aaa/?q=1");
    expect(result).not.toBeNull();
    expect(result!.url).toBe("http://www.example.com/aaa/ddd");
  });
});