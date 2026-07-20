import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with query string parsing", () => {
  it("should correctly parse query string when parseQueryString is true", () => {
    const url = "http://example.com/path?key=value&test=123";
    const result = parse(url);

    expect(result).not.toBeNull();
    expect(result?.url).toContain("key=value");
    expect(result?.url).toContain("test=123");
    expect(result?.search).toBe("?key=value&test=123");
    expect(result?.querycount).toBe(2);
  });
});