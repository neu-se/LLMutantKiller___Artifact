import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse URL without query string', () => {
  it('should not add query string to URL with no query parameters', () => {
    const result = parse("http://www.example.com/path");
    expect(result).not.toBeNull();
    expect(result.url).toBe("http://www.example.com/path");
    expect(result.search).toBeNull();
  });
});