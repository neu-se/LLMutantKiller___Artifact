import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function", () => {
  it("should preserve exact empty string for links without text content", () => {
    const html = `
      <html>
        <body>
          <a href="http://example.com/empty"></a>
        </body>
      </html>
    `;

    const results = extract(html, "http://example.com");
    const link = results[0];

    expect(link.text).toBe("");
    expect(link.text.length).toBe(0);
    expect(link.text).not.toMatch(/Stryker/);
  });
});