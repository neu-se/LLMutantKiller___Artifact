import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with protocol handling", () => {
  it("should correctly handle URLs with single-character protocols when base URL is provided", () => {
    // This test targets the mutation where the regex changed from \w+ to \w
    // The original regex ^(?!localhost)\w+: matches protocols with 1+ characters
    // The mutated regex ^(?!localhost)\w: matches protocols with exactly 1 character
    // We test with a 2-character protocol "ht" which should be treated as relative URL
    const result = parse("ht://example.com", "http://base.com");
    // With the original code, "ht://" should be treated as a relative path
    // and resolved against the base URL
    expect(result?.url).toBe("http://base.com/ht:/example.com");
  });
});