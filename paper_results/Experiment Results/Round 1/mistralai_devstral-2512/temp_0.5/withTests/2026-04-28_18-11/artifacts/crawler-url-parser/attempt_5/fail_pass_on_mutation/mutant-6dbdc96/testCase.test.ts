import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function with valid href", () => {
  it("should include valid http hrefs", () => {
    const html = `
      <html>
        <body>
          <a href="http://example.com/valid">valid link</a>
        </body>
      </html>
    `;
    const result = extract(html, "http://example.com");
    expect(result.length).toBe(1);
    expect(result[0].url).toBe("http://example.com/valid");
  });
});