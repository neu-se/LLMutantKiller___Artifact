import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function protocol validation", () => {
  it("should reject URLs with invalid single-character protocols", () => {
    // The mutation changes \w+ to \w in the regex
    // Original: ^(?!localhost)\w+: (requires 1+ characters after :)
    // Mutated: ^(?!localhost)\w: (requires exactly 1 character after :)
    // Test with "h:" which should be rejected by both, but "ht:" should be handled differently
    const singleCharResult = parse("h:test", "http://base.com");
    const twoCharResult = parse("ht:test", "http://base.com");
    // Original code should reject both as invalid protocols
    expect(singleCharResult).toBeNull();
    expect(twoCharResult).toBeNull();
  });
});