import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function with href attribute that is an empty string", () => {
  it("should skip links with empty string href attributes", () => {
    const html = `
      <html>
        <body>
          <a href="">Link with empty href</a>
          <a href="valid">Valid link</a>
        </body>
      </html>
    `;
    const baseUrl = "http://example.com";
    const result = extract(html, baseUrl);
    // In original code: empty string href should be skipped (typeof "" == "string", not "undefined")
    // In mutated code: typeof "" == "" evaluates to false, so it won't skip empty strings
    expect(result.length).toBe(1);
    expect(result[0].text).toBe("Valid link");
  });
});