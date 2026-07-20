import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function", () => {
  it("should correctly handle URLs starting with single slash when baseUrl is not provided", () => {
    const result = parse("/example.com/path");
    expect(result).not.toBeNull();
    expect(result?.url).toBe("http:///example.com/path");
    expect(result?.protocol).toBe("http:");
    expect(result?.host).toBeNull();
  });
});