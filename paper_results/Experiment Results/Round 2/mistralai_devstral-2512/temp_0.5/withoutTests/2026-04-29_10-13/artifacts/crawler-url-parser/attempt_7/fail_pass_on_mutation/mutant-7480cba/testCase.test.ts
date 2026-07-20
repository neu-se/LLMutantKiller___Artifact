import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function", () => {
  it("should correctly handle URLs with single-character protocols without slashes", () => {
    const result = parse("a:test", "http://example.com");
    expect(result).toBeNull();
  });
});