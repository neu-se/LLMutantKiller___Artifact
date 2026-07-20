import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function text handling", () => {
  it("should preserve non-empty text when URL is added to map", () => {
    const html = `
      <html>
        <head><base href="http://example.com/"></head>
        <body>
          <a href="http://example.com/target">Test Link</a>
        </body>
      </html>
    `;
    const sourceUrl = "http://example.com";
    const result = extract(html, sourceUrl);
    expect(result[0].text).toBe("Test Link");
  });
});