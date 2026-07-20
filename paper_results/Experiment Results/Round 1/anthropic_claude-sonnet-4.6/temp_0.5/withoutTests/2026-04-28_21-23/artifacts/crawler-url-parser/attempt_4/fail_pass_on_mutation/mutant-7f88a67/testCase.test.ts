import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse", () => {
  it("should return https protocol unchanged for an https URL (normalizeHttps must be false)", () => {
    // If normalizeHttps is true (mutant), normalize-url would convert https to http
    // If normalizeHttps is false (original), https is preserved
    const result = parse("https://example.com");
    expect(result).not.toBeNull();
    // The url field should start with https, not http
    expect(result!.url).toMatch(/^https:/);
    expect(result!.protocol).toBe("https:");
    // Ensure it's not been converted to http
    expect(result!.url).not.toMatch(/^http:[^s]/);
  });
});