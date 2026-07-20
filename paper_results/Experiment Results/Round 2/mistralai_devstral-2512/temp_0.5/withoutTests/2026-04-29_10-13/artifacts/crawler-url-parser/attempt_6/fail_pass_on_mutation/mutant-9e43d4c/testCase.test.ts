import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function", () => {
  it("should correctly handle URLs with query string parameters when resolveObject is true", () => {
    const url = "http://example.com/path?param1=value1&param2=value2";
    const result = parse(url);

    expect(result).not.toBeNull();
    expect(result?.url).toBe("http://example.com/path?param1=value1&param2=value2");
    expect(result?.search).toBe("?param1=value1&param2=value2");
    expect(result?.querycount).toBe(2);
  });
});