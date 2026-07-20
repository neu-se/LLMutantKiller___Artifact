import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with empty path handling", () => {
  it("should add trailing slash to URLs with empty path", () => {
    const url = "http://example.com";
    const result = parse(url);
    expect(result).not.toBeNull();
    if (result) {
      expect(result.url).toBe("http://example.com/");
      expect(result.path).toBe("/");
    }
  });
});