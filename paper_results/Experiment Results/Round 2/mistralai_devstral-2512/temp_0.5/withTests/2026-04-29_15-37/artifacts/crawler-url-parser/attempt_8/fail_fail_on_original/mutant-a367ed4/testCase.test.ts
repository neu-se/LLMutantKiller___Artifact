import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function with undefined href attribute", () => {
  it("should skip links with undefined href but not skip valid short hrefs", () => {
    const html = `
      <html>
        <body>
          <a>undefined href</a>
          <a href="ab">short valid href</a>
        </body>
      </html>
    `;
    const result = extract(html, "http://example.com");
    expect(result).toHaveLength(1);
    expect(result[0].url).toBe("http://example.com/ab");
    expect(result[0].text).toBe("short valid href");
  });
});