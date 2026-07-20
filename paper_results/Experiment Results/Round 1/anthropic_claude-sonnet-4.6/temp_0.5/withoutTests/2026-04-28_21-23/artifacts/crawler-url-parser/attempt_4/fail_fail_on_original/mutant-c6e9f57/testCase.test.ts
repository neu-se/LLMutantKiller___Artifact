import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("crawler-url-parser extract", () => {
  it("should treat URLs differing only by utm parameters as the same URL", () => {
    const html = `
      <html><body>
        <a href="http://example.com/page">Link 1</a>
        <a href="http://example.com/page?utm_source=google">Link 2</a>
      </body></html>
    `;
    const results = extract(html, "http://example.com/");
    const urls = results.map(r => r.url);
    // If utm params are stripped, both links resolve to same URL and deduplicated
    expect(urls.filter(u => u.includes("example.com/page")).length).toBe(1);
  });
});