import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract", () => {
  it("should correctly extract URLs from HTML with protocol-relative hrefs when no source URL is provided", () => {
    const html = '<a href="//example.com/page">Link</a>';
    const results = extract(html);
    expect(results).toHaveLength(1);
    expect(results[0].url).toBe("http://example.com/page");
  });
});