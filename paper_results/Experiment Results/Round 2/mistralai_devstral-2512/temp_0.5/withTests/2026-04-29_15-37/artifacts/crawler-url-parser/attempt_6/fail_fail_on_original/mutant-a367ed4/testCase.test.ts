import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function with exactly two-character href", () => {
  it("should include links with exactly two-character hrefs", () => {
    const html = `
      <html>
        <body>
          <a href="ab">two-char link</a>
        </body>
      </html>
    `;
    const result = extract(html, "http://example.com");
    expect(result).toHaveLength(1);
    expect(result[0].url).toBe("http://example.com/ab");
    expect(result[0].text).toBe("two-char link");
  });
});