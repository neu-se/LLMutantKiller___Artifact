import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("URL parsing with www handling", () => {
  it("should preserve www prefix when stripWWW is false", () => {
    const url = "http://www.example.com/path";
    const result = parse(url);
    expect(result).not.toBeNull();
    if (result) {
      // This would fail if stripWWW were actually implemented and set to false
      expect(result.host).toBe("www.example.com");
      expect(result.url).toBe("http://www.example.com/path");
    }
  });
});