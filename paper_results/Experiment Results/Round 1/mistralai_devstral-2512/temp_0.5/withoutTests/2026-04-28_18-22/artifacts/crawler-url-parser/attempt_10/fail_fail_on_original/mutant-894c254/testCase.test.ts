import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function query parameter handling", () => {
  it("should handle UTM parameters with different case patterns", () => {
    // Test with lowercase UTM parameter (should be removed in both versions)
    const url1 = "http://example.com/path?utm_source=test&ref=abc&other=value";
    const result1 = parse(url1);

    // Test with uppercase UTM parameter (behavior differs between versions)
    const url2 = "http://example.com/path?UTM_SOURCE=test&ref=abc&other=value";
    const result2 = parse(url2);

    expect(result1).not.toBeNull();
    expect(result2).not.toBeNull();

    if (result1 && result2) {
      // Both versions should handle lowercase UTM the same way
      expect(result1.url).toBe(result2.url);
      expect(result1.search).toBe(result2.search);
    }
  });
});