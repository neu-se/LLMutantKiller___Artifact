import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function with short href", () => {
  it("should not skip valid short hrefs", () => {
    const html = `
      <html>
        <body>
          <a href="ab">short link</a>
        </body>
      </html>
    `;
    const result = extract(html, "http://example.com");
    expect(result).toHaveLength(1);
    expect(result[0].url).toBe("http://example.com/ab");
    expect(result[0].text).toBe("short link");
  });
});