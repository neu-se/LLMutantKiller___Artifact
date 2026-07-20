import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function", () => {
  it("should handle links with null text content by setting empty string", () => {
    const html = `
      <html>
        <body>
          <a href="http://example.com/link1"></a>
        </body>
      </html>
    `;

    const results = extract(html, "http://example.com");
    const link = results[0];

    expect(link.text).toBe("");
    expect(link.text).not.toBe("Stryker was here!");
  });
});