import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function", () => {
  it("should correctly handle relative URLs starting with single character followed by colon", () => {
    const result = parse("x:test", "http://example.com");
    expect(result).toBeNull();
  });
});