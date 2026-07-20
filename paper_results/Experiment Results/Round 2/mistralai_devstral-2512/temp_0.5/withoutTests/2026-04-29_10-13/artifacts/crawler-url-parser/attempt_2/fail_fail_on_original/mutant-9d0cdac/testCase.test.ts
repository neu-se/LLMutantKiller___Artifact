import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function protocol detection", () => {
  it("should handle URLs with single-character protocols correctly", () => {
    const result = parse("x:valid", "http://example.com");
    expect(result).not.toBeNull();
    expect(result?.protocol).toBe("x:");
  });
});