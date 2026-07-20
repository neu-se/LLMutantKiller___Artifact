import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function protocol handling", () => {
  it("should handle URLs with single-character protocols when base URL is provided", () => {
    const result = parse("a:valid", "http://example.com");
    expect(result).not.toBeNull();
    expect(result?.protocol).toBe("a:");
  });
});