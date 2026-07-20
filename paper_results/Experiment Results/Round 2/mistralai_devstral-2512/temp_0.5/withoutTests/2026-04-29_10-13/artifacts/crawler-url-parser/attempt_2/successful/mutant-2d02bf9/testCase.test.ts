import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function", () => {
  it("should concatenate text from multiple links with the same URL", () => {
    const html = `
      <html>
        <body>
          <a href="https://example.com/page">First Link</a>
          <a href="https://example.com/page">Second Link</a>
        </body>
      </html>
    `;
    const sourceUrl = "https://example.com";
    const result = extract(html, sourceUrl);
    const link = result.find((item: any) => item.url === "https://example.com/page");
    expect(link).toBeDefined();
    expect(link?.text).toBe("First Link Second Link");
  });
});