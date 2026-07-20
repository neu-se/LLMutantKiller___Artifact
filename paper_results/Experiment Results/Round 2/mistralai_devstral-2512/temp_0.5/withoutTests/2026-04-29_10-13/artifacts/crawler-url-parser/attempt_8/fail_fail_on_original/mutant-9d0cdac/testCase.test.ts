import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function protocol validation", () => {
  it("should accept URLs with two-character protocols when base URL is provided", () => {
    const result = parse("ab:valid", "http://example.com");
    expect(result).not.toBeNull();
    expect(result?.protocol).toBe("ab:");
  });
});