import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function with three-character href", () => {
  it("should include links with three-character hrefs", () => {
    const html = `
      <html>
        <body>
          <a href="abc">three-char link</a>
        </body>
      </html>
    `;
    const result = extract(html, "http://example.com");
    expect(result).toHaveLength(1);
    expect(result[0].url).toBe("http://example.com/abc");
    expect(result[0].text).toBe("three-char link");
  });
});