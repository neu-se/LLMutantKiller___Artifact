import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function URL parsing behavior", () => {
  it("should correctly handle URLs with authentication and query parameters", () => {
    const url = "http://user:pass@example.com/path?query=value#fragment";
    const result = parse(url);

    expect(result).not.toBeNull();
    expect(result?.url).toBe("http://user:pass@example.com/path?query=value");
    expect(result?.host).toBe("user:pass@example.com");
    expect(result?.search).toBe("?query=value");
    expect(result?.path).toBe("/path");
  });
});