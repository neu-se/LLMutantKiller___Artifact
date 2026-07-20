import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function trailing slash behavior", () => {
  it("should preserve trailing slash in URL path when parsing a URL with trailing slash", () => {
    // The removeTrailingSlash option in result_normalize_options affects URL normalization
    // When removeTrailingSlash is true (original), trailing slashes should be removed
    // When removeTrailingSlash is false (mutated), trailing slashes should be preserved
    // Since result_normalize_options isn't actually applied in the parse function,
    // we test that the parse function handles URLs consistently
    const result = parse("http://example.com/path/");
    
    // The parse function uses URL.parse and URL.format which preserve trailing slashes
    // Both original and mutated should return the same result since options aren't applied
    // But we need to detect the mutation - let's verify the URL is returned correctly
    expect(result).not.toBeNull();
    expect(result.url).toBe("http://example.com/path/");
    expect(result.path).toBe("/path/");
  });
});