import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function protocol validation", () => {
  it("should correctly handle two-character protocols when base URL is provided", () => {
    // The mutation changes \w+ to \w in the regex
    // Original: ^(?!localhost)\w+: (matches 1+ character protocols)
    // Mutated: ^(?!localhost)\w: (matches exactly 1 character protocols)
    // Test with "ht" protocol which should be treated as relative path in original
    const result = parse("ht:test", "http://base.com");
    // Original code treats "ht:" as relative path and resolves against base URL
    expect(result?.url).toBe("http://base.com/ht:test");
  });
});