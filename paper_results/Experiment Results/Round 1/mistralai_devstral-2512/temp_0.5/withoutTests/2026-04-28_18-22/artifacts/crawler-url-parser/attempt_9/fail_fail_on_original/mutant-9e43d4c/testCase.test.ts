import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function URL parsing behavior", () => {
  it("should correctly parse URLs with query parameters containing semicolons when parseQueryString is true", () => {
    const url = "http://example.com/path?param=value;param2=value2";
    const result = parse(url);

    expect(result).not.toBeNull();
    expect(result?.url).toBe("http://example.com/path?param=value;param2=value2");
    expect(result?.search).toBe("?param=value;param2=value2");
    // The key difference: with parseQueryString=true, semicolons are treated as delimiters
    expect(result?.querycount).toBe(3); // 3 because semicolon creates additional parameter
  });
});