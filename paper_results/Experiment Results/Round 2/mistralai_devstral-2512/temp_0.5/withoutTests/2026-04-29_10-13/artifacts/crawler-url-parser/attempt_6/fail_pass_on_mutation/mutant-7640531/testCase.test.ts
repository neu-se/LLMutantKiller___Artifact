import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with fragment handling", () => {
  it("should preserve query parameters when fragment contains hash followed by query-like content", () => {
    const url = "http://example.com/path?param=value#fragment";
    const result = parse(url);

    expect(result).not.toBeNull();
    expect(result?.url).toBe("http://example.com/path?param=value");
    expect(result?.search).toBe("?param=value");
    expect(result?.path).toBe("/path");
  });
});