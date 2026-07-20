import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("URL path normalization", () => {
  it("should handle trailing slashes consistently in path normalization", () => {
    // Test case that would be affected by removeTrailingSlash option
    const url1 = "http://example.com/path/";
    const url2 = "http://example.com/path";

    const result1 = parse(url1);
    const result2 = parse(url2);

    // In original code (removeTrailingSlash: true), these should be equal
    // In mutated code (removeTrailingSlash: false), they should be different
    expect(result1?.path).toBe(result2?.path);
  });
});