import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function", () => {
  it("should not include links with null currentUrl in the result", () => {
    const html = `
      <html>
        <body>
          <a href="http://example.com/valid">Valid Link</a>
          <a href="">Empty Link</a>
        </body>
      </html>
    `;
    const sourceUrl = "http://example.com/page";
    const result = extract(html, sourceUrl);
    expect(result).toHaveLength(1);
    expect(result[0].url).toBe("http://example.com/valid");
    expect(result[0].text).toBe("Valid Link");
  });
});