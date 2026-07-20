import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function query parameter handling", () => {
  it("should correctly parse and count query parameters when parseQueryString is true", () => {
    const url = "http://example.com/path?param1=value1&param2=value2&param3=value3";
    const result = parse(url);
    expect(result).not.toBeNull();
    expect(result?.querycount).toBe(3);
  });
});