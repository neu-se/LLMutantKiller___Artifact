import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function", () => {
  it("should concatenate text only when it's not already included", () => {
    const html = `
      <html>
        <head><base href="http://example.com/base/"></head>
        <body>
          <a href="http://example.com/target">First Text</a>
          <a href="http://example.com/target">Second Text</a>
        </body>
      </html>
    `;

    const result = extract(html, "http://example.com/base/");
    const targetUrl = result.find((item: any) => item.url === "http://example.com/target");

    expect(targetUrl).toBeDefined();
    expect(targetUrl?.text).toBe("First Text Second Text");
  });
});