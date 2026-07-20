import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse relative URL with base URL containing query parameters', () => {
  it('should correctly resolve relative URL when base URL contains query parameters', () => {
    const result = parse("relative-path", "http://example.com/base/path?param1=value1&param2=value2");
    expect(result.url).toBe("http://example.com/base/relative-path");
    expect(result.baseurl).toBe("http://example.com/base/path?param1=value1&param2=value2");
  });
});