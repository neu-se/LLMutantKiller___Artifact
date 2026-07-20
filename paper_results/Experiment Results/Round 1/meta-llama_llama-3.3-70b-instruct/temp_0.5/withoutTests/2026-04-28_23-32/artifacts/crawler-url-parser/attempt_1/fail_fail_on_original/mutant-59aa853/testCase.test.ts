import { extract } from "../../../crawler-url-parser.js";

describe("crawler-url-parser", () => {
  it("should extract links with the correct text when a link appears multiple times", () => {
    const html = `
      <html>
        <body>
          <a href="https://example.com">Link 1</a>
          <a href="https://example.com">Link 2</a>
        </body>
      </html>
    `;
    const sourceUrl = "https://example.com";
    const result = extract(html, sourceUrl);
    expect(result.length).toBe(1);
    expect(result[0].text).toBe("Link 1 Link 2");
  });
});