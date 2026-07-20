import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function", () => {
  it("should correctly handle relative URLs with single-character protocols", () => {
    const result = parse("a:relative", "http://example.com");
    expect(result).toBeNull();
  });
});