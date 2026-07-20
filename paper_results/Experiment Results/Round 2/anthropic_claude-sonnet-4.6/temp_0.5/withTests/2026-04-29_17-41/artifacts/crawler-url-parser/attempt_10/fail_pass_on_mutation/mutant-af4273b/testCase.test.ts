import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse with current url same as base url', () => {
  it('should handle current url that resolves to same as base', () => {
    // Using a URL that when resolved against base gives base URL back
    // This happens when relative is empty or just "."
    const baseUrl = "http://www.stackoverflow.com/aaa/bbb?q=test";
    const result = parse(".", baseUrl);
    expect(result).not.toBeNull();
    expect(result!.url).toBe("http://www.stackoverflow.com/aaa/");
  });
});