import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function", () => {
  it("should filter out URLs that fail the currentUrl.url check", () => {
    const html = `
      <html>
        <head><base href="http://example.com"></head>
        <body>
          <a href="   ">Whitespace Link</a>
          <a href="http://valid.com">Valid Link</a>
        </body>
      </html>
    `;

    const result = extract(html, "http://example.com");
    expect(result.length).toBe(1);
    expect(result[0].url).toBe("http://valid.com/");
  });
});