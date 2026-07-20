import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function", () => {
  it("should correctly handle text extraction from anchor elements", () => {
    const html = `
      <html>
        <head><base href="http://example.com/base/"></head>
        <body>
          <a href="http://example.com/target">Link Text</a>
        </body>
      </html>
    `;
    const sourceUrl = "http://example.com/source";
    const result = extract(html, sourceUrl);
    expect(result[0].text).toBe("Link Text");
  });
});