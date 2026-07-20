import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function with non-string data", () => {
  it("should handle cheerio object input correctly", () => {
    const html = `
      <html>
        <body>
          <a href="http://example.com">Example</a>
        </body>
      </html>
    `;
    const cheerio = require("cheerio");
    const $ = cheerio.load(html);
    const result = extract($, "http://example.com");
    expect(result).toEqual([
      {
        url: "http://example.com/",
        text: "Example",
        type: "samelevel"
      }
    ]);
  });
});