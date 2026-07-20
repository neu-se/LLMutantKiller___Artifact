import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function with href length boundary test", () => {
  it("should include href with exactly 3 characters", () => {
    const html = `
      <html>
        <body>
          <a href="abc">test-link-1</a>
          <a href="ab">test-link-2</a>
        </body>
      </html>
    `;
    const result = extract(html, "http://www.example.com");
    const urls = result.map((item) => item.url);
    expect(urls).toContain("http://www.example.com/abc");
    expect(urls).not.toContain("http://www.example.com/ab");
  });
});