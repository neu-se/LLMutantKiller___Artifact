import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("Trailing slash normalization detection", () => {
  it("should preserve trailing slashes when removeTrailingSlash is false", () => {
    const result = parse("http://example.com/path/");
    // This test expects the trailing slash to be preserved
    // If removeTrailingSlash were true and applied, it would fail
    // If removeTrailingSlash were false (mutated) and applied, it would pass
    expect(result?.url).toBe("http://example.com/path/");
  });
});