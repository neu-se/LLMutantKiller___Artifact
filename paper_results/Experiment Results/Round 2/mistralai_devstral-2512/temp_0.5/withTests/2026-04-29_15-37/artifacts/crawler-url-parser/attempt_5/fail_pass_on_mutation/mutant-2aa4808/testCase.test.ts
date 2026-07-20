import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse relative URL with base URL containing special characters in query', () => {
  it('should correctly resolve relative URL when base URL contains special characters in query string', () => {
    const result = parse("relative-path", "http://example.com/base/path?query=value%20with%20spaces");
    expect(result.url).toBe("http://example.com/base/relative-path");
    expect(result.baseurl).toBe("http://example.com/base/path?query=value%20with%20spaces");
  });
});