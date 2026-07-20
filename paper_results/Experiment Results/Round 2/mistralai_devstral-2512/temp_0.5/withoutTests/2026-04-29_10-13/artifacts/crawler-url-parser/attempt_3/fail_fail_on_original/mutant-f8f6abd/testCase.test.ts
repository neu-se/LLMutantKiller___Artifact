import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function", () => {
  it("should handle links with href length less than 3", () => {
    const html = `
      <html>
        <body>
          <a href="ab">Short Link</a>
          <a href="http://example.com">Valid Link</a>
        </body>
      </html>
    `;
    const sourceUrl = "http://example.com";
    const result = extract(html, sourceUrl);

    // Should only include the valid link, not the short one
    expect(result.length).toBe(1);
    expect(result[0].url).toBe("http://example.com/");
    expect(result[0].text).toBe("Valid Link");
  });
});