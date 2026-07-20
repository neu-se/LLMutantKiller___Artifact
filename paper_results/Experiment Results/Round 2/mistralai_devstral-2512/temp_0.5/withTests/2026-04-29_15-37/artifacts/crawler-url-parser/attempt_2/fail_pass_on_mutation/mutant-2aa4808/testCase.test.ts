import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse relative URL with base URL containing authentication', () => {
  it('should correctly handle base URL with authentication and relative path', () => {
    const result = parse("relative-path", "http://user:pass@example.com/base/path");
    expect(result.url).toBe("http://user:pass@example.com/base/relative-path");
    expect(result.baseurl).toBe("http://user:pass@example.com/base/path");
  });
});