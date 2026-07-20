import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function", () => {
  it("should preserve exact empty string for links without text", () => {
    const html = `
      <html>
        <body>
          <a href="http://example.com/empty"></a>
          <a href="http://example.com/text">Text</a>
        </body>
      </html>
    `;

    const results = extract(html, "http://example.com");
    const emptyLink = results.find(r => r.url === "http://example.com/empty");

    expect(emptyLink).toBeDefined();
    expect(emptyLink?.text).toStrictEqual("");
    expect(emptyLink?.text).toHaveLength(0);
  });
});