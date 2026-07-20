import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function with null currentUrl", () => {
  it("should handle null currentUrl without crashing", () => {
    const html = `
      <html>
        <body>
          <a href="http://example.com">Example</a>
        </body>
      </html>
    `;
    const sourceUrl = "http://example.com";

    // This test should pass with the original code (null check with &&)
    // but fail with the mutated code (null check with ||)
    const result = extract(html, sourceUrl);
    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });
});