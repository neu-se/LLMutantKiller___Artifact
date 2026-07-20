import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with protocol handling", () => {
  it("should correctly handle URLs with protocol-like strings", () => {
    const result = parse("http:test", "http://example.com");
    expect(result).not.toBeNull();
    expect(result?.url).toBe("http://example.com/http:test");
  });
});