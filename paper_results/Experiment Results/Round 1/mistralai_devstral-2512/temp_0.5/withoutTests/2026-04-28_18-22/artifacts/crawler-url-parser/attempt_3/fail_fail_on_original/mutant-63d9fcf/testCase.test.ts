import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function", () => {
  it("should handle duplicate URLs with different text", () => {
    const html = `
      <html>
        <body>
          <a href="https://example.com/page">First Text</a>
          <a href="https://example.com/page">Second Text</a>
        </body>
      </html>
    `;
    const sourceUrl = "https://example.com";
    const result = extract(html, sourceUrl);

    const matchingLinks = result.filter((link: any) => link.url === "https://example.com/page");
    expect(matchingLinks.length).toBe(1);
    expect(matchingLinks[0].text).toBe("First Text");
  });
});