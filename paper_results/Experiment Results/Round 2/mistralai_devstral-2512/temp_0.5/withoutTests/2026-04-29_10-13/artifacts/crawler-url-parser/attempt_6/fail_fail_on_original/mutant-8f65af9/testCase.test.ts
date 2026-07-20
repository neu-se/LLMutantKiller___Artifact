import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function text handling", () => {
  it("should correctly handle null text in anchor elements when URL already exists", () => {
    const html = `
      <html>
        <head><base href="http://example.com/"></head>
        <body>
          <a href="http://example.com/target">First</a>
          <a href="http://example.com/target"></a>
        </body>
      </html>
    `;
    const sourceUrl = "http://example.com";
    const result = extract(html, sourceUrl);
    expect(result[0].text).toBe("First ");
  });
});