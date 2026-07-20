import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with query string", () => {
  it("should correctly handle query parameters in URL", () => {
    const url = "http://example.com/path?key1=value1&key2=value2";
    const result = parse(url);

    expect(result).not.toBeNull();
    expect(result?.search).toBe("?key1=value1&key2=value2");
    expect(result?.querycount).toBe(2);
  });
});