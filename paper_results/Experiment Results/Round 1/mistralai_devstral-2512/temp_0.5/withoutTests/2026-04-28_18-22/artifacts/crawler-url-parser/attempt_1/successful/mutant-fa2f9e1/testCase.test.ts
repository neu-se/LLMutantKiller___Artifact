import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function", () => {
  it("should handle null text correctly", () => {
    const html = `
      <html>
        <head></head>
        <body>
          <a href="http://example.com/page1">Link with text</a>
          <a href="http://example.com/page2"></a>
        </body>
      </html>
    `;
    const sourceUrl = "http://example.com";
    const result = extract(html, sourceUrl);

    expect(result).toHaveLength(2);
    expect(result[0].text).toBe("Link with text");
    expect(result[1].text).toBe("");
  });
});