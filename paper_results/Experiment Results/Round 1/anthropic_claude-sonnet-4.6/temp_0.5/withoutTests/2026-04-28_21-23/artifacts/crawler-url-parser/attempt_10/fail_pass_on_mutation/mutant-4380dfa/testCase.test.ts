import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse", () => {
  it("should handle URL where placeholder replacement is needed", () => {
    // The placeholder replace(/^\/\//, 'http://') runs in the else branch
    // For a URL that somehow has // at start at that point
    // Try with a URL that has no protocol and no leading slash
    // but somehow creates // after the prepend
    const result = parse("example.com");
    expect(result).not.toBeNull();
    expect(result?.protocol).toBe("http:");
    expect(result?.url).toMatch(/^http:\/\//);
    expect(result?.host).toBe("example.com");
  });
});