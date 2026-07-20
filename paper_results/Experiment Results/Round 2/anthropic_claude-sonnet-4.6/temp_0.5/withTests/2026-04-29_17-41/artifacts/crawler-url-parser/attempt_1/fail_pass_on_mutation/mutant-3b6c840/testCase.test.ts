import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse URL with trailing slash behavior', () => {
  it('should preserve trailing slash in URL with path ending in slash', () => {
    const result = parse("http://www.google.com/aaa/");
    expect(result).not.toBeNull();
    expect(result.url).toBe("http://www.google.com/aaa/");
  });
});