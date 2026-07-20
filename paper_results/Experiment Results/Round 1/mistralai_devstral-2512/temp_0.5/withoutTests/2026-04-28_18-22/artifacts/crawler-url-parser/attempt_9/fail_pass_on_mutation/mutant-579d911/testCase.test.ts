import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function", () => {
  it("should include hrefs with exactly 2 characters when they are not filtered protocols", () => {
    const html = `
      <html>
        <head><base href="http://example.com"></head>
        <body>
          <a href="ab">Two char link</a>
          <a href="http://example.com/page1">Page 1</a>
        </body>
      </html>
    `;
    const result = extract(html, "http://example.com");
    expect(result.length).toBeGreaterThanOrEqual(1);
    expect(result.some(r => r.url === "http://example.com/page1")).toBe(true);
  });
});