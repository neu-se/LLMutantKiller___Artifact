import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with protocol handling", () => {
  it("should correctly handle URLs with single-character protocols when base URL is provided", () => {
    const result = parse("a:", "http://example.com");
    expect(result).toBeNull();
  });
});