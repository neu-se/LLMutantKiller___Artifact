import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse", () => {
  it("should handle protocol-relative URL correctly when no base URL provided", () => {
    // Test that //example.com is properly parsed with http protocol
    const result = parse("//example.com/test");
    expect(result).not.toBeNull();
    expect(result?.protocol).toBe("http:");
    expect(result?.host).toBe("example.com");
    expect(result?.url).toBe("http://example.com/test");
  });
});