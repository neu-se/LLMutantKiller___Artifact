import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with URL normalization", () => {
  it("should correctly handle URLs without protocol when baseUrl is not provided", () => {
    const url = "example.com";
    const result = parse(url);
    expect(result).not.toBeNull();
    expect(result?.url).toBe("http://example.com/");
    expect(result?.protocol).toBe("http:");
    expect(result?.host).toBe("example.com");
  });
});