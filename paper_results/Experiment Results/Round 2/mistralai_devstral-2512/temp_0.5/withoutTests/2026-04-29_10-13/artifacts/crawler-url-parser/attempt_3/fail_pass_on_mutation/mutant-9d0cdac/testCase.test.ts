import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with protocol validation", () => {
  it("should reject URLs with invalid single-character protocols", () => {
    const result = parse("a:test", "http://example.com");
    expect(result).toBeNull();
  });
});