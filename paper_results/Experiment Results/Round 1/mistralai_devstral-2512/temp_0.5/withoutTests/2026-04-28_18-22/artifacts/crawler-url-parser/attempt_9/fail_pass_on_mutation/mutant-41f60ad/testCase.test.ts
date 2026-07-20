import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function query string parsing", () => {
  it("should correctly parse query parameters when parseQueryString is true", () => {
    const currentUrl = "http://example.com/path?param1=value1&param2=value2";
    const result = parse(currentUrl);

    expect(result).not.toBeNull();
    expect(result?.search).toBe("?param1=value1&param2=value2");
    expect(result?.querycount).toBe(2);
  });
});