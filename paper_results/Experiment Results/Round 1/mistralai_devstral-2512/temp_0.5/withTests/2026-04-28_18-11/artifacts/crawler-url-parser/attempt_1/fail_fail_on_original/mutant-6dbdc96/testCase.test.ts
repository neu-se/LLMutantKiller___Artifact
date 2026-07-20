import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function with href length check", () => {
  it("should skip hrefs with length less than 3", () => {
    const html = `
      <html>
        <body>
          <a href="ab">short link</a>
          <a href="http://example.com">valid link</a>
        </body>
      </html>
    `;
    const result = extract(html, "http://example.com");
    expect(result.length).toBe(1);
    expect(result[0].url).toBe("http://example.com/");
  });
});