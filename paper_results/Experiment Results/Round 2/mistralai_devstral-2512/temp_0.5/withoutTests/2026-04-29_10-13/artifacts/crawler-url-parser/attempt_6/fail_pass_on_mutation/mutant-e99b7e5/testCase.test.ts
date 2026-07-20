import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function", () => {
  it("should not modify empty text content of links", () => {
    const html = `
      <html>
        <body>
          <a href="http://example.com/link1"></a>
        </body>
      </html>
    `;

    const results = extract(html, "http://example.com");
    const link = results[0];

    expect(link.text).toBe("");
    expect(link.text).not.toContain("Stryker");
  });
});