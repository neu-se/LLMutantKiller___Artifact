import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with fragment handling", () => {
  it("should correctly handle URLs with fragments containing hash and query parameters", () => {
    const url = "http://example.com/path?param=value#fragment";
    const result = parse(url);

    expect(result).not.toBeNull();
    expect(result?.url).toBe("http://example.com/path?param=value");
    expect(result?.search).toBe("?param=value");
    expect(result?.path).toBe("/path");
  });
});