import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function - duplicate URL handling", () => {
  it("should not concatenate text when the same text appears twice for the same URL", () => {
    const html = `
      <html>
        <head><base href="http://example.com/"></head>
        <body>
          <a href="/page1">Same Text</a>
          <a href="/page1">Same Text</a>
        </body>
      </html>
    `;

    const result = extract(html, "http://example.com/");
    const link = result.find(l => l.url === "http://example.com/page1");

    expect(link).toBeDefined();
    expect(link?.text).toBe("Same Text");
  });
});