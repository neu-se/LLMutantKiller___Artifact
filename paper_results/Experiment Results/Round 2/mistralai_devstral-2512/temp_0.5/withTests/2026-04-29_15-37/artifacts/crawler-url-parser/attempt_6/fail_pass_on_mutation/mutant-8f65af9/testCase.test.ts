import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function text handling", () => {
  it("should correctly handle link text when text is null", () => {
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