import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function", () => {
  it("should not duplicate text when same text appears multiple times", () => {
    const html = `
      <html>
        <head><base href="http://example.com/base/"></head>
        <body>
          <a href="http://example.com/target">Same Text</a>
          <a href="http://example.com/target">Same Text</a>
        </body>
      </html>
    `;

    const result = extract(html, "http://example.com/base/");
    const targetUrl = result.find((item: any) => item.url === "http://example.com/target");

    expect(targetUrl).toBeDefined();
    expect(targetUrl?.text).toBe("Same Text");
  });
});