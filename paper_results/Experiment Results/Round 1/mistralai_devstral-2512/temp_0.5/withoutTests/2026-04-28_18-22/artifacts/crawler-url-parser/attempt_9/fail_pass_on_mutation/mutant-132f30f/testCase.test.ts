import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("URL parsing with www handling", () => {
  it("should handle www prefix in domain extraction", () => {
    const url = "http://www.example.com/path";
    const result = parse(url);
    expect(result).not.toBeNull();
    if (result) {
      // Test domain extraction (should be "example.com" regardless of www)
      expect(result.domain).toBe("example.com");
      // Test host preservation (should keep www if stripWWW is false)
      expect(result.host).toBe("www.example.com");
    }
  });
});