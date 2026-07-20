import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse URL with multi-character protocol without base URL', () => {
  it('should correctly parse http://example.com without prepending extra http://', () => {
    const result = parse("http://example.com");
    expect(result).not.toBeNull();
    expect(result.url).toBe("http://example.com/");
  });
});