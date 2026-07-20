import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse", () => {
  it("should handle URL with // prefix going through else branch", () => {
    // Try with baseUrlStr being an empty string (falsy) so we go to else branch
    // and currentUrlStr is "//example.com" which after LINE A becomes "http://example.com"
    const result = parse("//example.com/path", "");
    expect(result).not.toBeNull();
    expect(result?.protocol).toBe("http:");
    expect(result?.host).toBe("example.com");
    expect(result?.url).toMatch(/^http:\/\//);
  });
});