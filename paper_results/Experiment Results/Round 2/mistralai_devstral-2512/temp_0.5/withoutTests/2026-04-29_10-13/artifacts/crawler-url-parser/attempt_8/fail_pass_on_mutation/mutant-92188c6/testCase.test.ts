import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function query parameter handling", () => {
  it("should correctly count query parameters when parseQueryString is enabled", () => {
    const url = "http://example.com/test?a=1&b=2&c=3";
    const result = parse(url);

    expect(result).not.toBeNull();
    expect(result?.url).toBe("http://example.com/test?a=1&b=2&c=3");
    expect(result?.search).toBe("?a=1&b=2&c=3");
    // This assertion will fail in the mutated version because with parseQueryString=false,
    // the query string won't be properly parsed and the count will be incorrect
    expect(result?.querycount).toBe(3);
  });
});