import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function with string data", () => {
  it("should correctly extract URLs from HTML string", () => {
    const html = `
      <html>
        <body>
          <a href="http://example.com/page1">Page 1</a>
          <a href="/page2">Page 2</a>
        </body>
      </html>
    `;
    const result = extract(html, "http://example.com");
    expect(result.length).toBeGreaterThan(0);
    expect(result.some(r => r.url.includes("example.com"))).toBe(true);
  });
});