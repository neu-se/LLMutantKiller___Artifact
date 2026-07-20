import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function protocol validation", () => {
  it("should handle URLs starting with single character followed by colon", () => {
    // The mutation changes \w+ to \w in the regex
    // Original: ^(?!localhost)\w+: (matches 1+ character protocols)
    // Mutated: ^(?!localhost)\w: (matches exactly 1 character protocols)
    // Test with "h:" which should be treated as relative path in original
    const result = parse("h:", "http://base.com");
    // Original code should treat "h:" as relative path and resolve against base URL
    expect(result?.url).toBe("http://base.com/h:");
  });
});