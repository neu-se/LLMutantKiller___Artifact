import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function with valid hrefs", () => {
  it("should extract valid hrefs while skipping invalid ones", () => {
    const html = `
      <html>
        <body>
          <a href="http://example.com/page1">Page 1</a>
          <a href="http://example.com/page2">Page 2</a>
          <a href="javascript:void(0)">JS Link</a>
          <a href="mailto:test@example.com">Email</a>
        </body>
      </html>
    `;
    const result = extract(html, "http://example.com");
    expect(result.length).toBe(2);
    expect(result[0].url).toBe("http://example.com/page1");
    expect(result[1].url).toBe("http://example.com/page2");
  });
});