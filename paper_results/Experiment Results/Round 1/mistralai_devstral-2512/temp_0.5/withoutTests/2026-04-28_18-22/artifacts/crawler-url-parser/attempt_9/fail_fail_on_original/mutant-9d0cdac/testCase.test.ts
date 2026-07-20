import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function protocol validation", () => {
  it("should handle URLs with single-character protocols followed by colon", () => {
    // This should be treated as a relative URL in original code
    // but might be treated as absolute in mutated code
    const result = parse("x:test", "http://example.com");
    expect(result).not.toBeNull();
    expect(result?.url).toBe("http://example.com/x:test");
  });
});