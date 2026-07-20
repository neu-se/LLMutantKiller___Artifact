import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function protocol validation", () => {
  it("should handle URLs with single-character protocols", () => {
    const result = parse("a:test", "http://example.com");
    expect(result).not.toBeNull();
    expect(result?.url).toBe("http://example.com/a:test");
  });
});