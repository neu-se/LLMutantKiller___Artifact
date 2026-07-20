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
    // Original code: typeof "" == "string" (not "undefined") so it won't skip
    // but length < 3 check will skip it
    // Mutated code: typeof "" == "" is false, so it won't skip and will process
    // the empty href, resulting in different behavior
    expect(result).toHaveLength(0);
  });
});