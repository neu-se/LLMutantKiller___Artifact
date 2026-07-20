import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse", () => {
  it("should return null for a localhost:// URL since localhost is not a valid http/https protocol", () => {
    // localhost:// bypasses the outer condition check ((?!localhost) prevents \w+: from matching)
    // Original: inner lookahead (?!(?:\w+:)?\/\/) catches localhost:// → no http:// prepended → localhost: protocol → null
    // Mutated: inner lookahead (?!(?:\w:)?\/\/) does NOT catch localhost:// (multi-char) → http:// prepended → http: protocol → non-null
    const result = parse("localhost://example.com");
    expect(result).toBeNull();
  });
});