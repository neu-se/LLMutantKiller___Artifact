import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function with fragment handling', () => {
  it('should strip fragments from URLs when stripFragment is true', () => {
    const result = parse("http://example.com/path#fragment");
    expect(result).not.toBeNull();
    expect(result!.url).toBe("http://example.com/path");
    expect(result!.search).toBe("");
  });
});