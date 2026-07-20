import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function protocol validation", () => {
  it("should reject URLs with single-character protocols when base URL is provided", () => {
    // The mutation changes \w+ to \w in the regex, making it accept single-character protocols
    // Original code rejects "h://" (single char protocol), mutated code accepts it
    const result = parse("h://example.com", "http://base.com");
    // Original code should return null for invalid protocol
    expect(result).toBeNull();
  });
});