import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function with short href", () => {
  it("should include URLs with href length >= 3 in the result", () => {
    const html = `
      <html>
        <body>
          <a href="ab">short link</a>
          <a href="abc">valid link</a>
        </body>
      </html>
    `;
    const result = extract(html, "http://example.com");
    const urls = result.map((item) => item.url);
    expect(urls).toContain("http://example.com/abc");
    expect(urls).not.toContain("http://example.com/ab");
  });
});