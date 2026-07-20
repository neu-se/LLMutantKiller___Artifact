import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with default port removal", () => {
  it("should remove default ports from URLs", () => {
    const url = "http://example.com:80/path";
    const result = parse(url);
    expect(result).not.toBeNull();
    if (result) {
      expect(result.url).toBe("http://example.com/path");
      expect(result.host).toBe("example.com");
    }
  });
});