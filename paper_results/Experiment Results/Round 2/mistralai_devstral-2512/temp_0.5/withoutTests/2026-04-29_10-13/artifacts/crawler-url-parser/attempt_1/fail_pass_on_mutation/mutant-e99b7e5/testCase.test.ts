import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function", () => {
  it("should correctly handle null text in extracted URLs", () => {
    const html = `
      <html>
        <head><base href="http://example.com/base"></head>
        <body>
          <a href="http://example.com/link1">Link Text</a>
          <a href="http://example.com/link2"></a>
        </body>
      </html>
    `;

    const result = extract(html, "http://example.com");
    const linkWithoutText = result.find(link => link.url === "http://example.com/link2");

    expect(linkWithoutText).toBeDefined();
    expect(linkWithoutText?.text).toBe("");
  });
});