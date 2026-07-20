import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function", () => {
  it("should handle null currentUrl correctly", () => {
    const html = `
      <html>
        <head><base href="http://example.com/base"></head>
        <body>
          <a href="http://example.com/link1">Link 1</a>
          <a href="invalid">Invalid Link</a>
        </body>
      </html>
    `;
    const sourceUrl = "http://example.com";
    const result = extract(html, sourceUrl);
    expect(result).toHaveLength(1);
    expect(result[0].url).toBe("http://example.com/link1");
    expect(result[0].text).toBe("Link 1");
  });
});