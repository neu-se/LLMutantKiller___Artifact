import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function protocol handling", () => {
  it("should correctly handle URLs with two-character protocols", () => {
    const result = parse("ab:test", "http://example.com");
    expect(result).not.toBeNull();
    expect(result?.protocol).toBe("ab:");
  });
});