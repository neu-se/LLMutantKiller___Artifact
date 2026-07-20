import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function", () => {
  it("should include links with href length >= 3", () => {
    const html = `
      <html>
        <body>
          <a href="abc">Valid Short Link</a>
        </body>
      </html>
    `;
    const sourceUrl = "http://example.com";
    const result = extract(html, sourceUrl);

    // Should include the link with href length >= 3
    expect(result.length).toBe(1);
    expect(result[0].url).toBe("http://example.com/abc");
    expect(result[0].text).toBe("Valid Short Link");
  });
});