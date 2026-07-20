import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function behavior with string input", () => {
  it("should correctly process HTML string and extract links", () => {
    const html = `
      <html>
        <head>
          <base href="http://example.com/base/">
        </head>
        <body>
          <a href="page1">Page 1</a>
          <a href="page2">Page 2</a>
        </body>
      </html>
    `;
    const result = extract(html, "http://example.com");
    expect(result.length).toBeGreaterThan(0);
    expect(result[0].url).toContain("example.com");
  });
});