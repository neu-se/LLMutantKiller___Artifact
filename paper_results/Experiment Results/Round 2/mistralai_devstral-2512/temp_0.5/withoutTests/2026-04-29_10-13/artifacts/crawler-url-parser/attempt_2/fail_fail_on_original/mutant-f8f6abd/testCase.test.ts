import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function", () => {
  it("should handle undefined href attributes correctly", () => {
    const html = `
      <html>
        <body>
          <a href="http://example.com">Valid Link</a>
          <a>No Href Attribute</a>
        </body>
      </html>
    `;
    const sourceUrl = "http://example.com";
    const result = extract(html, sourceUrl);

    // Should only include the valid link, not the one without href
    expect(result.length).toBe(1);
    expect(result[0].url).toBe("http://example.com/");
    expect(result[0].text).toBe("Valid Link");
  });
});