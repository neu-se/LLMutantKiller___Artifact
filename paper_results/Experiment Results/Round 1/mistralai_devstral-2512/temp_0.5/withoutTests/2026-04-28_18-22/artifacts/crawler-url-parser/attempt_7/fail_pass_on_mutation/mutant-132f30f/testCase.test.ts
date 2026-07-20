import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("URL parsing with www handling", () => {
  it("should handle www prefix consistently in domain extraction", () => {
    const url = "http://www.example.com/path";
    const result = parse(url);
    expect(result).not.toBeNull();
    if (result) {
      // Test that domain is extracted correctly regardless of www prefix
      expect(result.domain).toBe("example.com");
      // Test that host preserves the original format
      expect(result.host).toBe("www.example.com");
    }
  });
});