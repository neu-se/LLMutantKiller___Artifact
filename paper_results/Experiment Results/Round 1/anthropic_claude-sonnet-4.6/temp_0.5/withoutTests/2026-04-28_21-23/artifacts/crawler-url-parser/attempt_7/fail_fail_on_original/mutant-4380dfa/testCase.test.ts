import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract", () => {
  it("should handle page with no source URL and protocol-relative links", () => {
    const html = '<a href="//example.com/page">link</a>';
    const results = extract(html, null);
    // parse("//example.com/page") is called with no base
    // LINE A converts to http://example.com/page
    // else branch, inner if FALSE (has protocol)
    // placeholder: no change
    expect(results.length).toBeGreaterThan(0);
  });
});