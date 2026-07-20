import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function", () => {
  it("should handle string data input correctly", () => {
    const htmlData = `
      <html>
        <body>
          <a href="https://example.com">Link</a>
        </body>
      </html>
    `;

    const result = extract(htmlData, "https://example.com");
    expect(result).toEqual([
      {
        url: "https://example.com",
        text: "Link",
        type: "samelevel"
      }
    ]);
  });
});