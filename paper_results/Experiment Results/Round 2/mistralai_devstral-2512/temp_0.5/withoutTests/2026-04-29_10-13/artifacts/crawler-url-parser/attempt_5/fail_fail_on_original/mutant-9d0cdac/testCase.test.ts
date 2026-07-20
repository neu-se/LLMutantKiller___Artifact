import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with protocol detection", () => {
  it("should handle URLs with single-character protocols followed by valid path", () => {
    const result = parse("a:/valid/path", "http://example.com");
    expect(result).not.toBeNull();
    expect(result?.protocol).toBe("a:");
  });
});