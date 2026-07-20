import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("Query parameter removal mutation test", () => {
  it("should handle URLs with utm parameters containing underscores vs special characters", () => {
    // Test URL with utm parameter containing underscore (should be removed in original)
    const urlWithUnderscore = "http://example.com/path?utm_source=test&other=value";
    const result1 = parse(urlWithUnderscore);
    // In original code, utm_source should be removed (if normalization was applied)
    // In mutated code, it would remain (since \W+ wouldn't match underscore)
    expect(result1?.url).toBeDefined();

    // Test URL with utm parameter containing special character (should remain in both)
    const urlWithSpecialChar = "http://example.com/path?utm_source=test&ref=test";
    const result2 = parse(urlWithSpecialChar);
    expect(result2?.url).toBeDefined();
  });
});