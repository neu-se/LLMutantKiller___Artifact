import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function - URL without base URL and colon in path", () => {
  it("should prepend http:// to a relative path containing a colon in the middle (not as a protocol)", () => {
    // This URL has no protocol and no leading slash, but contains a colon in the middle
    // Original regex: ^(?!localhost)\w+: - requires colon right after word chars from start
    // So "path/to:something" does NOT match ^(?!localhost)\w+: (starts with path/ not path:)
    // Therefore original adds http:// prefix
    // Mutated regex: (?!localhost)\w+: - matches "to:" anywhere in string
    // So "path/to:something" DOES match, condition is false, http:// is NOT added
    const result = parse("path/to:something");
    // In original: http:// is prepended, making it "http://path/to:something"
    // which should parse to a valid URL with protocol http:
    // In mutated: no http:// prepended, "path/to:something" has protocol "path:"
    // which is not http: or https:, so returns null
    expect(result).not.toBeNull();
    expect(result?.protocol).toBe("http:");
  });
});