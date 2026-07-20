import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with query string handling", () => {
  it("should correctly handle query parameters when parsing URLs", () => {
    const urlWithQuery = "http://example.com/path?param1=value1&param2=value2";
    const result = parse(urlWithQuery);

    expect(result).not.toBeNull();
    expect(result?.url).toBe("http://example.com/path?param1=value1&param2=value2");
    expect(result?.search).toBe("?param1=value1&param2=value2");
    expect(result?.querycount).toBe(2);
    expect(result?.query).toBeDefined();
    expect(result?.query?.param1).toBe("value1");
    expect(result?.query?.param2).toBe("value2");
  });
});