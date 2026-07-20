import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function", () => {
  it("should correctly parse a bare domain URL without protocol or base URL", () => {
    // A URL like "example.com/path" without protocol or base URL
    // The original code should prepend http:// making it a valid URL
    // The mutation changes the regex which affects how protocol-relative URLs are handled
    // Specifically, for a URL that starts with "//" but isn't caught by the earlier replace
    // We test that parse("example.com") returns a valid result with http protocol
    const result = parse("example.com/path");
    expect(result).not.toBeNull();
    expect(result?.protocol).toBe("http:");
    expect(result?.host).toBe("example.com");
  });
});