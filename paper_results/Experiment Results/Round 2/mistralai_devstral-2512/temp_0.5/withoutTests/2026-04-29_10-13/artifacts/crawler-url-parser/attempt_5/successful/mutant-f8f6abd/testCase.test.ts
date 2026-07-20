import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function", () => {
  it("should handle undefined href attributes by not including them in results", () => {
    const html = `
      <html>
        <body>
          <a>Link without href</a>
          <a href="http://valid.com">Valid Link</a>
        </body>
      </html>
    `;
    const sourceUrl = "http://example.com";
    const result = extract(html, sourceUrl);

    // Should only include the valid link, not the one without href
    expect(result.length).toBe(1);
    expect(result[0].url).toBe("http://valid.com/");
    expect(result[0].text).toBe("Valid Link");
  });
});