import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse relative URL with base URL containing port number', () => {
  it('should correctly resolve relative URL when base URL contains port number', () => {
    const result = parse("relative-path", "http://example.com:8080/base/path");
    expect(result.url).toBe("http://example.com:8080/base/relative-path");
    expect(result.baseurl).toBe("http://example.com:8080/base/path");
  });
});