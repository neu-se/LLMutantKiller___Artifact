import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function", () => {
  it("should skip hrefs with javascript protocol", () => {
    const html = `
      <html>
        <head><base href="http://example.com"></head>
        <body>
          <a href="javascript:void(0)">Click me</a>
          <a href="http://example.com/page1">Page 1</a>
        </body>
      </html>
    `;
    const result = extract(html, "http://example.com");
    expect(result).toHaveLength(1);
    expect(result[0].url).toBe("http://example.com/page1");
  });
});