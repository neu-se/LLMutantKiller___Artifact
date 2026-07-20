import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with query string handling", () => {
  it("should correctly parse URL with query parameters and preserve them in the result", () => {
    const urlWithQuery = "http://example.com/path?param1=value1&param2=value2";
    const result = parse(urlWithQuery);

    expect(result).not.toBeNull();
    expect(result?.url).toBe("http://example.com/path?param1=value1&param2=value2");
    expect(result?.search).toBe("?param1=value1&param2=value2");
    expect(result?.querycount).toBe(2);
  });
});