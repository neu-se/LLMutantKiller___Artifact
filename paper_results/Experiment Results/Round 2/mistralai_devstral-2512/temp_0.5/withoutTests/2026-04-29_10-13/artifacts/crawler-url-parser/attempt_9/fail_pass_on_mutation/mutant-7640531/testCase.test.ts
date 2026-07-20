import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with fragment handling", () => {
  it("should correctly handle URLs with fragments containing hash followed by additional path-like content", () => {
    const url = "http://example.com/path#/additional/path";
    const result = parse(url);

    expect(result).not.toBeNull();
    expect(result?.url).toBe("http://example.com/path");
    expect(result?.search).toBeNull();
    expect(result?.path).toBe("/path");
  });
});