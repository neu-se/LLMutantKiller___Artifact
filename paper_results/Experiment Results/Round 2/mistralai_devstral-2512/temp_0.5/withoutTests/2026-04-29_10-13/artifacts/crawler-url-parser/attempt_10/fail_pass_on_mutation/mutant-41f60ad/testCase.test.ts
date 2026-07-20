import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function query string parsing", () => {
  it("should correctly handle empty query parameter values when parseQueryString is true", () => {
    const url = "http://example.com/path?param1=&param2=value";
    const result = parse(url);

    expect(result).not.toBeNull();
    expect(result?.search).toBe("?param1=&param2=value");
    expect(result?.querycount).toBe(2);
  });
});