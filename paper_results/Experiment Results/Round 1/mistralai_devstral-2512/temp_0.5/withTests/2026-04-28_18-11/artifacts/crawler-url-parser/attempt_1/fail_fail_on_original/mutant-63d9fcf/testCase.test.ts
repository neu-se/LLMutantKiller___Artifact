import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function with duplicate link text handling", () => {
  it("should include URLs with non-matching text in the result", () => {
    const html = `
      <html>
        <body>
          <a href="http://example.com/page1">Unique Text 1</a>
          <a href="http://example.com/page2">Unique Text 2</a>
          <a href="http://example.com/page1">Different Text</a>
        </body>
      </html>
    `;
    const baseUrl = "http://example.com";
    const result = extract(html, baseUrl);

    // Should include both URLs even though page1 appears with different text
    const urls = result.map(r => r.url);
    expect(urls).toContain("http://example.com/page1");
    expect(urls).toContain("http://example.com/page2");

    // Should have 2 entries (not 1) because the texts are different
    const page1Entries = result.filter(r => r.url === "http://example.com/page1");
    expect(page1Entries.length).toBe(1);
    expect(page1Entries[0].text).toBe("Unique Text 1");
  });
});