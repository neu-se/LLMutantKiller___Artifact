import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function protocol validation", () => {
  it("should handle URLs with exactly two-character protocols correctly", () => {
    // The mutation changes \w+ to \w in the regex
    // Original: ^(?!localhost)\w+: (matches 1+ character protocols)
    // Mutated: ^(?!localhost)\w: (matches exactly 1 character protocols)
    // Test with "ht" protocol which should be treated differently
    const result = parse("ht://example.com", "http://base.com");
    // Original code should treat "ht:" as relative path and resolve against base URL
    // Mutated code will incorrectly treat it as a protocol
    expect(result?.url).toBe("http://base.com/ht://example.com");
  });
});