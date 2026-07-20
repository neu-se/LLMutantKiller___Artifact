import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function with javascript: href", () => {
  it("should skip links with javascript: protocol but include other links", () => {
    const html = `
      <html>
        <body>
          <a href="javascript:void(0)">Click me</a>
          <a href="mailto:test@example.com">Email</a>
          <a href="http://example.com">Valid link</a>
        </body>
      </html>
    `;
    const result = extract(html, "http://example.com");
    expect(result.length).toBe(2);
    expect(result[0].url).toBe("http://example.com/");
    expect(result[1].url).toBe("http://example.com/");
  });
});