import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function with mailto href", () => {
  it("should skip mailto hrefs", () => {
    const html = `
      <html>
        <body>
          <a href="mailto:test@example.com">email link</a>
          <a href="http://example.com">valid link</a>
        </body>
      </html>
    `;
    const result = extract(html, "http://example.com");
    expect(result.length).toBe(1);
    expect(result[0].url).toBe("http://example.com/");
  });
});