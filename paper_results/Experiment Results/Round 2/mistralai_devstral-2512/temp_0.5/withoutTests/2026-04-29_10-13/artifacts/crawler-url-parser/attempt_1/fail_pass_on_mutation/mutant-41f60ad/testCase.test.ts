import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function query string handling", () => {
  it("should correctly parse query parameters when they exist", () => {
    const url = "http://example.com/path?param1=value1&param2=value2";
    const result = parse(url);

    expect(result).not.toBeNull();
    expect(result?.search).toBe("?param1=value1&param2=value2");
    expect(result?.querycount).toBe(2);
  });
});