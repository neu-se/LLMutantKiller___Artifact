import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function with empty string href", () => {
  it("should handle empty string href attributes correctly", () => {
    const html = `
      <html>
        <body>
          <a href="">Empty href link</a>
        </body>
      </html>
    `;
    const baseUrl = "http://example.com";
    const result = extract(html, baseUrl);
    // Original code: typeof "" == "string" (not "undefined") so it won't skip
    // but length < 3 check will skip it
    // Mutated code: typeof "" == "" is false, so it won't skip and will process
    // the empty href, resulting in different behavior
    expect(result).toEqual([]);
  });
});