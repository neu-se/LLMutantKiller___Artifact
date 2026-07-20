import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function - text concatenation behavior", () => {
  it("should not duplicate text when the same URL appears multiple times with identical text", () => {
    const htmlContent = `
      <html>
        <head><base href="http://example.com/base/"></head>
        <body>
          <a href="http://example.com/target">Link Text</a>
          <a href="http://example.com/target">Link Text</a>
        </body>
      </html>
    `;

    const result = extract(htmlContent, "http://example.com/base/");
    const targetUrl = result.find(item => item.url === "http://example.com/target");

    expect(targetUrl).toBeDefined();
    expect(targetUrl?.text).toBe("Link Text");
    expect(targetUrl?.text).not.toBe("Link Text Link Text");
  });
});