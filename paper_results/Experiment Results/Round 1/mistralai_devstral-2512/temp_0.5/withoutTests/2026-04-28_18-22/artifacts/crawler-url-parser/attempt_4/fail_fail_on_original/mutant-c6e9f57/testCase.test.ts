import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with WWW stripping", () => {
  it("should strip www from host when stripWWW is true", () => {
    const url = "http://www.example.com/path";
    const result = parse(url);

    expect(result).not.toBeNull();
    expect(result?.host).toBe("example.com");
    expect(result?.url).toBe("http://example.com/path");
  });
});