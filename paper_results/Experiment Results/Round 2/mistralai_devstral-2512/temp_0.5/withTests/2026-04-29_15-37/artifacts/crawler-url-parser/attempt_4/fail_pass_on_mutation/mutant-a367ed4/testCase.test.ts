import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function with empty string href", () => {
  it("should skip links with empty href", () => {
    const html = `
      <html>
        <body>
          <a href="">empty href</a>
          <a href="http://example.com/valid">valid link</a>
        </body>
      </html>
    `;
    const result = extract(html, "http://example.com");
    expect(result).toHaveLength(1);
    expect(result[0].url).toBe("http://example.com/valid");
    expect(result[0].text).toBe("valid link");
  });
});