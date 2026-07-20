import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function", () => {
  it("should handle invalid URLs by not including them in results", () => {
    const html = `
      <html>
        <head><base href="http://example.com"></head>
        <body>
          <a href="http://valid.com">Valid Link</a>
          <a href="invalid">Invalid Link</a>
        </body>
      </html>
    `;

    const result = extract(html, "http://example.com");
    const validUrls = result.filter(item => item.url);
    expect(validUrls.length).toBe(1);
    expect(validUrls[0].url).toBe("http://valid.com/");
  });
});