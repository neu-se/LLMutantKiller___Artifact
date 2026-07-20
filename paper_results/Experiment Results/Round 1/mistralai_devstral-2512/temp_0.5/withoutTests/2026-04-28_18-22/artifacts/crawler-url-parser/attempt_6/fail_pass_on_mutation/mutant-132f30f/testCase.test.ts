import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with www prefix handling", () => {
  it("should preserve www prefix in the host when stripWWW is false", () => {
    const url = "http://www.example.com/path";
    const result = parse(url);
    expect(result).not.toBeNull();
    if (result) {
      expect(result.host).toBe("www.example.com");
    }
  });
});