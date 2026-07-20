import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function", () => {
  it("should handle href with length less than 3 correctly", () => {
    const html = `
      <html>
        <head><base href="http://example.com/base"></head>
        <body>
          <a href="ab">Short Link</a>
        </body>
      </html>
    `;
    const sourceUrl = "http://example.com";
    const result = extract(html, sourceUrl);
    expect(result).toHaveLength(0);
  });
});