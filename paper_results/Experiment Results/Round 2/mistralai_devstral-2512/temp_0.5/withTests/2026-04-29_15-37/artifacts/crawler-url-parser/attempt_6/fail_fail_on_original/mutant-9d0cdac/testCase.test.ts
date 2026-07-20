import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with protocol handling", () => {
  it("should correctly handle relative URLs starting with single character followed by colon when base URL is provided", () => {
    const result = parse("a:relative", "http://example.com");
    expect(result).not.toBeNull();
    expect(result.url).toBe("http://example.com/a:relative");
  });
});