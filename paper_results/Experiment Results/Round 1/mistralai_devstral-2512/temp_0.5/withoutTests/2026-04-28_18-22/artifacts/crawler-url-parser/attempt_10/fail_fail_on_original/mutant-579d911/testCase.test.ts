import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function", () => {
  it("should include hrefs with exactly 2 characters that are not filtered protocols", () => {
    const html = `
      <html>
        <head><base href="http://example.com"></head>
        <body>
          <a href="ab">Two char link</a>
          <a href="http://example.com/page1">Page 1</a>
        </body>
      </html>
    `;
    const result = extract(html, "http://example.com");
    // The original code should include both links (length >= 3 check is false for "ab")
    // The mutated code should only include the second link (false condition always skips)
    expect(result).toHaveLength(2);
    expect(result.some(r => r.url === "http://example.com/ab")).toBe(true);
    expect(result.some(r => r.url === "http://example.com/page1")).toBe(true);
  });
});