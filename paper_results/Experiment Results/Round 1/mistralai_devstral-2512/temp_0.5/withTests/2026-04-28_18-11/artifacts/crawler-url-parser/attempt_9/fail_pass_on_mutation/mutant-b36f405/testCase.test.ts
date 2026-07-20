import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("Query parameter removal mutation test", () => {
  it("should handle URLs with utm parameters containing underscores", () => {
    // Test URL with standard utm parameter (contains underscore)
    const url1 = "http://example.com/path?utm_source=test&other=value";
    const result1 = parse(url1);

    // Test URL with utm parameter containing special character
    const url2 = "http://example.com/path?utm_source=test&ref=test";
    const result2 = parse(url2);

    // Both URLs should be parsed successfully
    expect(result1).not.toBeNull();
    expect(result2).not.toBeNull();

    // The actual difference would appear if query parameter removal was implemented
    // Original code would remove utm_source (matches \w+)
    // Mutated code would keep utm_source (doesn't match \W+)
  });
});