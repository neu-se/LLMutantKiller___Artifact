import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function query parameter handling", () => {
  it("should handle standard query parameters", () => {
    const url = "http://example.com/path?param1=value1&param2=value2";
    const result = parse(url);

    expect(result).not.toBeNull();
    if (result) {
      expect(result.url).toContain("param1=value1");
      expect(result.url).toContain("param2=value2");
      expect(result.search).toContain("param1=value1");
      expect(result.search).toContain("param2=value2");
    }
  });
});