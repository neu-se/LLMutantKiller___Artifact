import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function protocol validation", () => {
  it("should handle URLs with single-character protocols followed by colon", () => {
    const result = parse("a:test", "http://example.com");
    expect(result).not.toBeNull();
    expect(result?.protocol).toBe("a:");
  });
});