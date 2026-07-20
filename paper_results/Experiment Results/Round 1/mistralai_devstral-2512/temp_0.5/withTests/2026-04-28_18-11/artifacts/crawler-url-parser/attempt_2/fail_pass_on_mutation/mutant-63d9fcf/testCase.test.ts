import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function duplicate URL handling", () => {
  it("should include duplicate URLs with different text content", () => {
    const html = `
      <html>
        <body>
          <a href="http://example.com/page1">First Link</a>
          <a href="http://example.com/page1">Second Link</a>
        </body>
      </html>
    `;
    const baseUrl = "http://example.com";
    const result = extract(html, baseUrl);

    // Should include the URL even though it appears twice with different text
    const urls = result.map(r => r.url);
    expect(urls).toContain("http://example.com/page1");

    // Should have exactly one entry for the URL (original behavior)
    const page1Entries = result.filter(r => r.url === "http://example.com/page1");
    expect(page1Entries.length).toBe(1);
  });
});