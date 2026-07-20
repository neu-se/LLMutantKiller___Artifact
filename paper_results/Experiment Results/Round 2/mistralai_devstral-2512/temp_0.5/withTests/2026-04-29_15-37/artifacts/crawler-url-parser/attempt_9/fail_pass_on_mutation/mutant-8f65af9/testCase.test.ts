import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function with null text", () => {
  it("should handle null text correctly in link extraction", () => {
    const html = `
      <html>
        <body>
          <a href="http://example.com/page1"></a>
        </body>
      </html>
    `;

    const result = extract(html, "http://example.com");
    const link = result.find((link) => link.url === "http://example.com/page1");

    expect(link).toBeDefined();
    expect(link?.text).toBe("");
  });
});