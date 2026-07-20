import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function query parameter handling", () => {
  it("should correctly handle query parameters in URL parsing", () => {
    const url = "http://example.com/path?key1=value1&key2=value2";
    const result = parse(url);
    expect(result.search).toBe("?key1=value1&key2=value2");
    expect(result.querycount).toBe(2);
    expect(result.url).toContain("key1=value1");
    expect(result.url).toContain("key2=value2");
  });
});