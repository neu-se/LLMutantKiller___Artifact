import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with protocol handling", () => {
  it("should correctly handle URLs starting with single character protocol when base URL is provided", () => {
    const result = parse("a:valid", "http://example.com");
    expect(result).not.toBeNull();
    expect(result.url).toBe("http://example.com/a:valid");
  });
});