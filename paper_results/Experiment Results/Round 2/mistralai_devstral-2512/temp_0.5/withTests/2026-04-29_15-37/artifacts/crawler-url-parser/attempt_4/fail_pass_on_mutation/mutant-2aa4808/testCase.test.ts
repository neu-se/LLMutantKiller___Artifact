import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse relative URL with base URL containing query and hash', () => {
  it('should correctly handle base URL with query parameters and hash when resolving relative path', () => {
    const result = parse("relative-path", "http://example.com/base/path?query=value#section");
    expect(result.url).toBe("http://example.com/base/relative-path");
    expect(result.baseurl).toBe("http://example.com/base/path?query=value");
  });
});