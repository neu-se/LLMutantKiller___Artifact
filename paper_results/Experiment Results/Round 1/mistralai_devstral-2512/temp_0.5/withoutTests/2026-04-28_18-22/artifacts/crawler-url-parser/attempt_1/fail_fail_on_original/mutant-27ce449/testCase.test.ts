import { extract } from "./crawler-url-parser.js";

describe("extract function", () => {
  it("should not include URLs with null or undefined url property", () => {
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
    const hasInvalidUrl = result.some(item => !item.url);
    expect(hasInvalidUrl).toBe(false);
  });
});