import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function", () => {
  it("should correctly parse URLs with query parameters when resolveObject is true", () => {
    const url = "http://example.com/path?key1=value1&key2=value2";
    const result = parse(url);

    expect(result).not.toBeNull();
    expect(result?.url).toBe("http://example.com/path?key1=value1&key2=value2");
    expect(result?.search).toBe("?key1=value1&key2=value2");
    expect(result?.querycount).toBe(2);
  });
});