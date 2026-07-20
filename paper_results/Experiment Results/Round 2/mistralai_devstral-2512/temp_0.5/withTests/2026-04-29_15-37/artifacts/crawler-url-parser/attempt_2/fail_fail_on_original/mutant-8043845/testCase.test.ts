import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function with short href", () => {
  it("should skip short hrefs during extraction", () => {
    const html = `
      <html>
        <body>
          <a href="ab">Short link</a>
          <a href="http://example.com">Valid link</a>
        </body>
      </html>
    `;
    const result = extract(html, "http://example.com");
    expect(result.length).toBe(1);
    expect(result[0].url).toBe("http://example.com/");
  });
});