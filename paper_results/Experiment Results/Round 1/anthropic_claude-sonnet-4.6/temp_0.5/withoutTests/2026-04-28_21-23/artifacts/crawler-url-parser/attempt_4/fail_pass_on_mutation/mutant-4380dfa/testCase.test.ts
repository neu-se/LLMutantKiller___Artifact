import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse", () => {
  it("should handle URL that goes through else branch with // replacement", () => {
    // Test with a URL where baseUrlStr is provided as a protocol-relative URL
    // that after processing might trigger the placeholder
    const result = parse("page.html", "//example.com/base/");
    expect(result).not.toBeNull();
    expect(result?.protocol).toBe("http:");
    expect(result?.host).toBe("example.com");
  });
});