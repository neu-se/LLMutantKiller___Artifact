import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse relative URL with base URL containing hash', () => {
  it('should correctly resolve relative URL when base URL contains hash', () => {
    const result = parse("relative-path", "http://example.com/base/path#section");
    expect(result.url).toBe("http://example.com/base/relative-path");
    expect(result.baseurl).toBe("http://example.com/base/path");
  });
});