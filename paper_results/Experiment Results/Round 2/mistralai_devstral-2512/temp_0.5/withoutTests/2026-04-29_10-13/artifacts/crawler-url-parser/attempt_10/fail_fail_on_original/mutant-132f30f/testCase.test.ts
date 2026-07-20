import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("URL www prefix handling", () => {
  it("should strip www prefix from host when stripWWW is true", () => {
    const url = "http://www.example.com/path";
    const result = parse(url);
    // This test expects the www to be stripped (original behavior)
    // It would fail if stripWWW were false (mutated version)
    expect(result?.host).toBe("example.com");
    expect(result?.url).toBe("http://example.com/path");
  });
});