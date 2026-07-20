import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function text handling", () => {
  it("should correctly handle empty string text in anchor elements", () => {
    const html = `
      <html>
        <head><base href="http://example.com/"></head>
        <body>
          <a href="http://example.com/target"></a>
          <a href="http://example.com/target">Some Text</a>
        </body>
      </html>
    `;
    const sourceUrl = "http://example.com";
    const result = extract(html, sourceUrl);
    expect(result[0].text).toBe("Some Text");
  });
});