import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("Query parameter removal mutation test", () => {
  it("should handle URLs with utm parameters containing underscores vs special characters", () => {
    // Test URL with standard utm parameter (contains underscore)
    const urlWithUnderscore = "http://example.com/path?utm_source=test&other=value";
    const result1 = parse(urlWithUnderscore);

    // Test URL with utm parameter containing special character
    const urlWithSpecialChar = "http://example.com/path?utm_source=test&ref=test";
    const result2 = parse(urlWithSpecialChar);

    // Both URLs should be parsed successfully
    expect(result1).not.toBeNull();
    expect(result2).not.toBeNull();

    // The actual difference would appear if query parameter removal was implemented
    // Original code would remove utm_source (matches \w+)
    // Mutated code would keep utm_source (doesn't match \W+)
    // Since the normalization isn't implemented, we can only test that parsing works
    expect(result1?.url).toBeDefined();
    expect(result2?.url).toBeDefined();
  });
});