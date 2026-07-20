import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function text assignment", () => {
  it("should correctly assign link text to extracted URLs", () => {
    const html = `
      <html>
        <body>
          <a href="http://example.com/page1">Link Text 1</a>
          <a href="http://example.com/page2">Link Text 2</a>
        </body>
      </html>
    `;
    const baseUrl = "http://example.com";
    const result = extract(html, baseUrl);

    // The mutation changes the condition from `text == null ? "" : text` to `true ? "" : text`
    // This means the text will always be set to empty string in the mutated version
    // So we check that the text is properly assigned in the original version
    expect(result).toHaveLength(2);
    expect(result[0].text).toBe("Link Text 1");
    expect(result[1].text).toBe("Link Text 2");
  });
});