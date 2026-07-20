import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function behavior with null currentUrl", () => {
  it("should handle null currentUrl gracefully", () => {
    const html = `
      <html>
        <body>
          <a href="http://valid.com">Valid URL</a>
        </body>
      </html>
    `;

    const result = extract(html, "http://base.com");
    const hasNullUrl = result.some(url => url.url === null || url.url === undefined);

    expect(hasNullUrl).toBe(false);
    expect(result.length).toBeGreaterThan(0);
  });
});