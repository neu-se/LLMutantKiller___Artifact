import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function with undefined href", () => {
  it("should handle undefined href attributes during extraction", () => {
    const html = `
      <html>
        <body>
          <a href="http://example.com/valid">Valid link</a>
          <a>No href attribute</a>
        </body>
      </html>
    `;
    const result = extract(html, "http://example.com");
    expect(result.length).toBe(1);
    expect(result[0].url).toBe("http://example.com/valid");
  });
});