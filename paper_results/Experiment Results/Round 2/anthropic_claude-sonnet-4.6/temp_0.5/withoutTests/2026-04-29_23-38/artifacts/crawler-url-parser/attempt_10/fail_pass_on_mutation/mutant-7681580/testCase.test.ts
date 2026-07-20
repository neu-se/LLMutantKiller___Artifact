import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract", () => {
  it("should extract links correctly from HTML with an http source URL", () => {
    const html = '<a href="/page1">Link 1</a><a href="/page2">Link 2</a>';
    const result = extract(html, "http://example.com");
    expect(result).toHaveLength(2);
    expect(result.map(r => r.url)).toContain("http://example.com/page1");
    expect(result.map(r => r.url)).toContain("http://example.com/page2");
  });
});