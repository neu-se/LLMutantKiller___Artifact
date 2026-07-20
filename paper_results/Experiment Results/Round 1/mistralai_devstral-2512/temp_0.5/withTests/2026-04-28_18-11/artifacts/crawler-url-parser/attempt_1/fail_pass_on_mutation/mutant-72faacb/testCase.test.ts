import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function with empty string href", () => {
  it("should handle empty string href attributes correctly", () => {
    const html = `
      <html>
        <body>
          <a href="">Empty href link</a>
          <a href="valid">Valid link</a>
        </body>
      </html>
    `;
    const baseUrl = "http://example.com";
    const result = extract(html, baseUrl);
    // The empty href should be skipped in original code but might be processed in mutated code
    // We expect only the valid link to be extracted
    expect(result.length).toBe(1);
    expect(result[0].url).toBe("http://example.com/valid");
    expect(result[0].text).toBe("Valid link");
  });
});