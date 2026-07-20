import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function URL parsing behavior", () => {
  it("should correctly handle URLs with special characters in query parameters", () => {
    const url = "http://example.com/path?param=value&other=test=value";
    const result = parse(url);

    expect(result).not.toBeNull();
    expect(result?.url).toBe("http://example.com/path?param=value&other=test=value");
    expect(result?.search).toBe("?param=value&other=test=value");
    expect(result?.querycount).toBe(3);
  });
});