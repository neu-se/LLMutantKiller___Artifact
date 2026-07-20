import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse URL trailing slash normalization', () => {
  it('should return url without trailing slash for path without trailing slash', () => {
    const result = parse("http://www.example.com/aaa");
    expect(result).not.toBeNull();
    expect(result.url).toBe("http://www.example.com/aaa");
    expect(result.url.endsWith("/")).toBe(false);
  });
});