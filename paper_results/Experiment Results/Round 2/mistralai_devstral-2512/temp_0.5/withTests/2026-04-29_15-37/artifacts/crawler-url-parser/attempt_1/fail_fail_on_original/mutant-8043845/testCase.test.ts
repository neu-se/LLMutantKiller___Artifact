import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function with javascript: URL", () => {
  it("should skip javascript: URLs during extraction", () => {
    const html = `
      <html>
        <body>
          <a href="javascript:void(0)">Click me</a>
          <a href="http://example.com">Valid link</a>
        </body>
      </html>
    `;
    const result = extract(html, "http://example.com");
    expect(result.length).toBe(1);
    expect(result[0].url).toBe("http://example.com/");
  });
});