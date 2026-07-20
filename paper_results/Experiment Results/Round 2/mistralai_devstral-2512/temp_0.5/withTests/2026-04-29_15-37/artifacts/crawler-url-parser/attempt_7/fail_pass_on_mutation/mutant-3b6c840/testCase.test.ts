import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("Trailing slash normalization", () => {
  it("should preserve trailing slashes in URLs", () => {
    const result = parse("http://example.com/path/");
    // If removeTrailingSlash were true and actually applied, this would fail
    // If removeTrailingSlash were false (mutated), this would pass
    expect(result?.url).toBe("http://example.com/path/");
  });
});