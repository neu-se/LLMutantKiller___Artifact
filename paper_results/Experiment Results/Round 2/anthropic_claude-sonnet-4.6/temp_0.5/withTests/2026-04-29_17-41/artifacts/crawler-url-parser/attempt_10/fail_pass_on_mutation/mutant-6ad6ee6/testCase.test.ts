import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse fragment-only URL', () => {
  it('should resolve empty fragment URL to base URL', () => {
    const result = parse("#", "http://example.com/page");
    expect(result).not.toBeNull();
    expect(result!.url).toBe("http://example.com/page");
  });
});