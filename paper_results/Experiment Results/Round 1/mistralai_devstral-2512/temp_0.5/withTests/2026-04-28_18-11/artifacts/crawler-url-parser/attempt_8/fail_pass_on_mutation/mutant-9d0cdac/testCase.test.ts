import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function protocol validation", () => {
  it("should correctly handle URLs with two-character protocols", () => {
    // The mutation changes \w+ to \w in the regex
    // Original: ^(?!localhost)\w+: (matches 1+ character protocols)
    // Mutated: ^(?!localhost)\w: (matches exactly 1 character protocols)
    // Test with "ht" protocol which should be rejected by original but accepted by mutated
    const result = parse("ht://example.com", "http://base.com");
    // Original code should reject this as invalid protocol (not http/https)
    expect(result).toBeNull();
  });
});