import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function with href length check", () => {
  it("should include hrefs with length exactly 2", () => {
    const html = `
      <html>
        <body>
          <a href="ab">short link</a>
        </body>
      </html>
    `;
    const result = extract(html, "http://example.com");
    expect(result.length).toBe(1);
    expect(result[0].url).toBe("http://example.com/ab");
  });
});