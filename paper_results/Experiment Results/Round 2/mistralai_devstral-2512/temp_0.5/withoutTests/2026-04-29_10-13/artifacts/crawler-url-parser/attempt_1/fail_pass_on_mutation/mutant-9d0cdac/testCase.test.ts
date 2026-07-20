import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with protocol handling", () => {
  it("should correctly handle URLs starting with a single character followed by colon", () => {
    const result = parse("a:test", "http://example.com");
    expect(result).toBeNull();
  });
});