import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with encoded query parameters", () => {
  it("should correctly handle URL-encoded query parameters when parseQueryString is true", () => {
    const url = "http://example.com/path?param%201=value%201&param%202=value%202";
    const result = parse(url);

    expect(result).not.toBeNull();
    expect(result?.search).toBe("?param%201=value%201&param%202=value%202");
    expect(result?.querycount).toBe(2);
  });
});