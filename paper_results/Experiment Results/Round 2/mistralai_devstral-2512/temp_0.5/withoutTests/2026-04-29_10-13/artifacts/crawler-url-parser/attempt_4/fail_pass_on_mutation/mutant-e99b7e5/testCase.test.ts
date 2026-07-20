import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function", () => {
  it("should correctly handle links with null text content", () => {
    const html = `
      <html>
        <body>
          <a href="http://example.com/link1"></a>
          <a href="http://example.com/link2">Some text</a>
        </body>
      </html>
    `;

    const results = extract(html, "http://example.com");
    const linkWithoutText = results.find(r => r.url === "http://example.com/link1");

    expect(linkWithoutText).toBeDefined();
    expect(linkWithoutText?.text).toBe("");
    expect(linkWithoutText?.text).not.toBe("Stryker was here!");
  });
});