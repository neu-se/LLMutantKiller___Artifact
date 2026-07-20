import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse fragment handling', () => {
  it('should return URL without fragment when URL contains only a fragment', () => {
    const result = parse("http://www.example.com/page#section");
    expect(result).not.toBeNull();
    expect(result.url).toBe("http://www.example.com/page");
  });
});