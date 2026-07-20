import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse URL without query string', () => {
  it('should produce correct url without trailing question mark', () => {
    const result = parse("http://www.example.com/path");
    expect(result).not.toBeNull();
    expect(result.url).not.toContain('?');
    expect(result.url).toBe("http://www.example.com/path");
  });
});