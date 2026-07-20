import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function protocol validation", () => {
  it("should reject URLs with invalid protocols when base URL is provided", () => {
    // The mutation changes \w+ to \w in the regex
    // Original: ^(?!localhost)\w+: (requires 1+ characters after :)
    // Mutated: ^(?!localhost)\w: (requires exactly 1 character after :)
    // Test with "x:" which should be rejected by original but accepted by mutated
    const result = parse("x:test", "http://base.com");
    // Original code should reject this as invalid protocol
    expect(result).toBeNull();
  });
});