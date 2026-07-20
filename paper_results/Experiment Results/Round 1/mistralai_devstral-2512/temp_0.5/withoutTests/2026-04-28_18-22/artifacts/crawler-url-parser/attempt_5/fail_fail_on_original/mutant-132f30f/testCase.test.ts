import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function URL normalization", () => {
  it("should normalize URLs by removing www prefix", () => {
    const url = "http://www.example.com/path";
    const result = parse(url);
    expect(result).not.toBeNull();
    if (result) {
      expect(result.url).toBe("http://example.com/path");
    }
  });
});