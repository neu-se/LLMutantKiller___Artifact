import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function", () => {
  it("should include mailto links when they are the only links present", () => {
    const html = `
      <html>
        <body>
          <a href="mailto:test@example.com">Email</a>
        </body>
      </html>
    `;
    const sourceUrl = "https://example.com";
    const result = extract(html, sourceUrl);
    expect(result).toHaveLength(1);
    expect(result[0].url).toBe("mailto:test@example.com");
  });
});