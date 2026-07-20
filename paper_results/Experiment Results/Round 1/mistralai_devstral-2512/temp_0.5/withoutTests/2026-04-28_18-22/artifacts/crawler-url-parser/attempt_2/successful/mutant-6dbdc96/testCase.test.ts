import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function", () => {
  it("should exclude links with href length less than 3", () => {
    const html = `
      <html>
        <body>
          <a href="ab">Short link</a>
          <a href="http://valid.com">Valid link</a>
        </body>
      </html>
    `;
    const sourceUrl = "http://example.com";
    const result = extract(html, sourceUrl);
    expect(result).toHaveLength(1);
    expect(result[0].url).toBe("http://valid.com/");
    expect(result[0].text).toBe("Valid link");
  });
});