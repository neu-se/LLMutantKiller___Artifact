import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function with two-character href", () => {
  it("should process two-character hrefs correctly", () => {
    const html = `
      <html>
        <body>
          <a href="ab">two-char link</a>
          <a href="http://example.com/valid">valid link</a>
        </body>
      </html>
    `;
    const result = extract(html, "http://example.com");
    expect(result).toHaveLength(2);
    expect(result[0].url).toBe("http://example.com/ab");
    expect(result[0].text).toBe("two-char link");
    expect(result[1].url).toBe("http://example.com/valid");
    expect(result[1].text).toBe("valid link");
  });
});