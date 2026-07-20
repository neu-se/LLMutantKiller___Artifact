import { extract } from "./crawler-url-parser.js";

describe("extract function", () => {
  it("should include links with exactly 3 characters in the result", () => {
    const html = `
      <html>
        <body>
          <a href="abc">Link</a>
        </body>
      </html>
    `;
    const sourceUrl = "http://example.com";
    const result = extract(html, sourceUrl);
    expect(result).toHaveLength(1);
    expect(result[0].url).toBe("http://example.com/abc");
  });
});