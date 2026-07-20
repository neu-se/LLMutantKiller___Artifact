import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function", () => {
  it("should handle text assignment when text is null vs undefined", () => {
    const html = `
      <html>
        <head><base href="http://example.com"></head>
        <body>
          <a href="http://example.com/page1"></a>
          <a href="http://example.com/page2">Link Text</a>
        </body>
      </html>
    `;
    const sourceUrl = "http://example.com";
    const result = extract(html, sourceUrl);

    expect(result).toHaveLength(2);
    expect(result[0].url).toBe("http://example.com/page1");
    expect(result[0].text).toBe("");
    expect(result[1].url).toBe("http://example.com/page2");
    expect(result[1].text).toBe("Link Text");
  });
});