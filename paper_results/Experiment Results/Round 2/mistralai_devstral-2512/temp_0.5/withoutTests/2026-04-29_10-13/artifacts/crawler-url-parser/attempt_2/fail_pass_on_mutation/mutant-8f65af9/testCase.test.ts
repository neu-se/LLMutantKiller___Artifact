import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function text handling", () => {
  it("should preserve anchor text when URL is already in map with different text", () => {
    const html = `
      <html>
        <head><base href="http://example.com/"></head>
        <body>
          <a href="http://example.com/target">First Text</a>
          <a href="http://example.com/target">Second Text</a>
        </body>
      </html>
    `;
    const sourceUrl = "http://example.com";
    const result = extract(html, sourceUrl);
    expect(result[0].text).toBe("First Text Second Text");
  });
});