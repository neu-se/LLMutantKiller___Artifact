import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse strips URL fragments', () => {
  it('should strip fragment from URL with hash and return URL without fragment', () => {
    const result = parse("http://www.example.com/page#section");
    expect(result).not.toBeNull();
    expect(result.url).toBe("http://www.example.com/page");
    expect(result.url).not.toContain("#");
    expect(result.url).not.toContain("section");
  });
});