import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function with fragment handling', () => {
  it('should strip fragments from URLs when stripFragment is true', () => {
    const result = parse("http://example.com/path?q=query#fragment");
    expect(result).not.toBeNull();
    expect(result!.url).toBe("http://example.com/path?q=query");
    expect(result!.search).toBe("?q=query");
  });
});