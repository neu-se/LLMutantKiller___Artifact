import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("Query parameter removal mutation test", () => {
  it("should handle URLs with utm parameters containing special characters in extract", () => {
    const html = `
      <html>
        <body>
          <a href="http://example.com/path?utm_source=test&other=value">Link 1</a>
          <a href="http://example.com/path?utm_medium=email&ref=test">Link 2</a>
        </body>
      </html>
    `;
    const results = extract(html, "http://example.com");
    expect(results.length).toBe(2);
    expect(results[0].url).toContain("utm_source=test");
    expect(results[1].url).toContain("utm_medium=email");
  });
});