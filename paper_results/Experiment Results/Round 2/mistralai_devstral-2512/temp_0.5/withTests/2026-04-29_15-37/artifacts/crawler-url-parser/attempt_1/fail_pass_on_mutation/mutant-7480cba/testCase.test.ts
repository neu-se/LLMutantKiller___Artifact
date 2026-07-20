import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function protocol handling", () => {
  it("should correctly handle URLs with single-character protocols", () => {
    const result = parse("a://example.com");
    expect(result).toBeNull();
  });
});