import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function", () => {
  it("should include valid short URLs in the result", () => {
    const html = `
      <html>
        <body>
          <a href="ab">Short link</a>
        </body>
      </html>
    `;
    const sourceUrl = "http://example.com/page";
    const result = extract(html, sourceUrl);
    expect(result).toContainEqual(
      expect.objectContaining({
        url: "http://example.com/ab",
        text: "Short link",
        type: "sublevel"
      })
    );
  });
});