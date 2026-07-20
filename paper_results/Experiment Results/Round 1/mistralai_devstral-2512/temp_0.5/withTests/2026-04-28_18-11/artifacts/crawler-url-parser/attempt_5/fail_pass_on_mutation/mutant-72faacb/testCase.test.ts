import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function with href attribute that is an empty string", () => {
  it("should skip links with empty string href attributes", () => {
    const html = `
      <html>
        <body>
          <a href="">Link with empty href</a>
        </body>
      </html>
    `;
    const baseUrl = "http://example.com";
    const result = extract(html, baseUrl);
    // In original code: empty string href should be skipped (typeof "" == "string", not "undefined")
    // In mutated code: typeof "" == "" evaluates to false, so it won't skip empty strings
    // and will try to process it, resulting in a different outcome
    expect(result).toEqual([]);
  });
});