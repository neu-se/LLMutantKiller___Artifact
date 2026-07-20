import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function query string parsing", () => {
  it("should correctly count query parameters with equals signs in values when parseQueryString is true", () => {
    const url = "http://example.com/path?param=value=with=equals&other=normal";
    const result = parse(url);

    expect(result).not.toBeNull();
    expect(result?.search).toBe("?param=value=with=equals&other=normal");
    expect(result?.querycount).toBe(3);
  });
});