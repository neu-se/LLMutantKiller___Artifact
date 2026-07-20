import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function", () => {
  it("should not include URLs with null url property when currentUrl is null", () => {
    const html = `
      <html>
        <head><base href="http://example.com"></head>
        <body>
          <a href="">Empty Link</a>
          <a href="http://valid.com">Valid Link</a>
        </body>
      </html>
    `;

    const result = extract(html, "http://example.com");
    const hasNullUrl = result.some(item => item.url === null || item.url === undefined);
    expect(hasNullUrl).toBe(false);
    expect(result.length).toBe(1);
  });
});