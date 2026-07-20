import { parse } from "./crawler-url-parser.js";

describe("parse function with query parameters", () => {
  it("should correctly parse relative URLs with query parameters when base URL has query parameters", () => {
    const baseUrl = "http://example.com/path?key=value";
    const relativeUrl = "relative?param=123";
    const result = parse(relativeUrl, baseUrl);

    expect(result).not.toBeNull();
    expect(result?.url).toBe("http://example.com/relative?param=123");
    expect(result?.search).toBe("?param=123");
    expect(result?.querycount).toBe(1);
  });
});