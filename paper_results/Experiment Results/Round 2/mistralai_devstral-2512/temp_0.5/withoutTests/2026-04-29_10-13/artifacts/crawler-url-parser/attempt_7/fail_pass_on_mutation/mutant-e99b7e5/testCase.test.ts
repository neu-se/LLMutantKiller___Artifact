import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function", () => {
  it("should return empty string for links without text content", () => {
    const html = `
      <html>
        <body>
          <a href="http://example.com/page1"></a>
        </body>
      </html>
    `;

    const results = extract(html, "http://example.com");
    const linkWithoutText = results.find(r => r.url === "http://example.com/page1");

    expect(linkWithoutText).toBeDefined();
    expect(linkWithoutText?.text).toBe("");
    expect(linkWithoutText?.text).toBeFalsy();
  });
});