import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function URL parsing behavior", () => {
  it("should correctly handle URLs with query parameters containing semicolons", () => {
    const url = "http://example.com/path?param=value;param2=value2";
    const result = parse(url);

    expect(result).not.toBeNull();
    expect(result?.url).toBe("http://example.com/path?param=value;param2=value2");
    expect(result?.search).toBe("?param=value;param2=value2");
    expect(result?.querycount).toBe(2);
  });
});