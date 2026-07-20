import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function", () => {
  it("should handle non-string cheerio object input correctly", () => {
    const cheerio = require('cheerio');
    const $ = cheerio.load(`
      <html>
        <body>
          <a href="https://example.com/path">Test Link</a>
        </body>
      </html>
    `);

    const result = extract($, "https://example.com");
    expect(result).toContainEqual({
      url: "https://example.com/path",
      text: "Test Link",
      type: "sublevel"
    });
  });
});