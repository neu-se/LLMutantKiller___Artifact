import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function", () => {
  it("should exclude URLs with length less than 3 characters", () => {
    const html = `
      <html>
        <body>
          <a href="ab">Short link</a>
          <a href="abc">Valid link</a>
        </body>
      </html>
    `;
    const sourceUrl = "http://example.com/page";
    const result = extract(html, sourceUrl);
    expect(result).toEqual([
      {
        url: "http://example.com/abc",
        text: "Valid link",
        type: "sublevel"
      }
    ]);
  });
});