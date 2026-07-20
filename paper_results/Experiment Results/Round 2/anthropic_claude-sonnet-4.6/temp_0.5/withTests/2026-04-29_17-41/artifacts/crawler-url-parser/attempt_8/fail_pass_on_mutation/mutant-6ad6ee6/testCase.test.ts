import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse fragment-only URL with base', () => {
  it('should resolve fragment-only URL to base URL', () => {
    const result = parse("#section", "http://example.com/page");
    expect(result).not.toBeNull();
    expect(result!.url).toBe("http://example.com/page");
  });
});