import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with query parameters", () => {
  it("should correctly parse URL query parameters when parseQueryString is true", () => {
    const currentUrl = "http://example.com/path?param1=value1&param2=value2";
    const result = parse(currentUrl);

    expect(result).not.toBeNull();
    expect(result?.url).toBe("http://example.com/path?param1=value1&param2=value2");
    expect(result?.search).toBe("?param1=value1&param2=value2");
    expect(result?.querycount).toBe(2);
  });
});