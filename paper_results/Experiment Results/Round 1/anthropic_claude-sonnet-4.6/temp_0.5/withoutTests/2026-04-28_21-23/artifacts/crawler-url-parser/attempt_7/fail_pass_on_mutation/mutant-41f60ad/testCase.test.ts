import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract", () => {
  it("should correctly extract URLs with query parameters from HTML", () => {
    const html = '<a href="/search?q=test&page=2">Search</a>';
    const result = extract(html, "http://example.com/");
    expect(result).toHaveLength(1);
    expect(result[0].url).toBe("http://example.com/search?q=test&page=2");
  });
});