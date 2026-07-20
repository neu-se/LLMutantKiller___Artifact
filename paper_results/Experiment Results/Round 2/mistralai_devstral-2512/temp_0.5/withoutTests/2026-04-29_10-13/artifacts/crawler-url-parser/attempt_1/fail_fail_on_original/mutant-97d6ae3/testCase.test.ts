import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function", () => {
  it("should handle null currentUrl correctly", () => {
    const html = `
      <html>
        <head><base href="http://example.com/"></head>
        <body>
          <a href="http://invalid-url">Invalid URL</a>
        </body>
      </html>
    `;

    const result = extract(html, "http://example.com/");
    expect(result).toEqual([]);
  });
});