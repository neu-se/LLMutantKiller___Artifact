import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function", () => {
  it("should include short hrefs that are not javascript/mailto/ftp", () => {
    const html = `
      <html>
        <head><base href="http://example.com"></head>
        <body>
          <a href="ab">Short link</a>
          <a href="http://example.com/page1">Page 1</a>
        </body>
      </html>
    `;
    const result = extract(html, "http://example.com");
    expect(result).toHaveLength(2);
    expect(result.some(r => r.url === "http://example.com/ab")).toBe(true);
    expect(result.some(r => r.url === "http://example.com/page1")).toBe(true);
  });
});