import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse relative URL with base URL containing fragment', () => {
  it('should correctly handle base URL with fragment when resolving relative path', () => {
    const result = parse("relative-path", "http://example.com/base/path#fragment");
    expect(result.url).toBe("http://example.com/base/relative-path");
    expect(result.baseurl).toBe("http://example.com/base/path");
  });
});