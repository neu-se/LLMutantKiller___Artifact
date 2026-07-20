import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with HTTPS URLs", () => {
  it("should preserve https protocol when parsing an https URL", () => {
    const result = parse("https://www.example.com/path");
    // With normalizeHttps: false (original), https should be preserved
    // With normalizeHttps: true (mutant), https would be converted to http
    expect(result).not.toBeNull();
    expect(result!.protocol).toBe("https:");
    expect(result!.url).toContain("https://");
  });
});