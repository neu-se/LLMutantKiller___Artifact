import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract", () => {
  it("should handle localhost:// source URL correctly", () => {
    const html = '<a href="http://other.com/page">link</a>';
    const result = extract(html, "localhost://example.com");
    // Original: parse("localhost://example.com") returns null → baseUrl = null → baseUrlStr = null
    //   parse("http://other.com/page", null) → http://other.com/page → non-null
    //   result: [{url: "http://other.com/page", ...}]
    // Mutated: parse("localhost://example.com") returns non-null → baseUrl = non-null → baseUrlStr = "http://localhost://example.com" (or similar)
    //   parse("http://other.com/page", "http://localhost://example.com") → http://other.com/page → non-null
    //   result: [{url: "http://other.com/page", ...}]
    // Both same!
    expect(result).toHaveLength(1);
  });
});