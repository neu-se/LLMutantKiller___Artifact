import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("Trailing slash behavior", () => {
  it("should handle URLs with trailing slashes consistently", () => {
    const result1 = parse("http://example.com/path/");
    const result2 = parse("http://example.com/path");

    // These should be different URLs (one with slash, one without)
    expect(result1?.url).not.toBe(result2?.url);

    // The one with trailing slash should preserve it
    expect(result1?.url).toBe("http://example.com/path/");
    expect(result2?.url).toBe("http://example.com/path");
  });
});