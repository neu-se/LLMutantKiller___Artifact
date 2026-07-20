import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function with undefined href", () => {
  it("should skip links with undefined href", () => {
    const html = `
      <html>
        <body>
          <a href="ab">short link</a>
          <a>no href</a>
        </body>
      </html>
    `;
    const result = extract(html, "http://example.com");
    expect(result).toHaveLength(1);
    expect(result[0].url).toBe("http://example.com/ab");
    expect(result[0].text).toBe("short link");
  });
});