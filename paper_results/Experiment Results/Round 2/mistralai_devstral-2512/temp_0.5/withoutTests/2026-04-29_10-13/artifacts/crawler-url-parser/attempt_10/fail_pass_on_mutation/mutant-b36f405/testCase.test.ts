import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with query parameters", () => {
  it("should handle URLs with utm_ parameters containing only word characters", () => {
    const url = "http://example.com/path?utm_source=abc123&ref=test";
    const result = parse(url);
    expect(result).not.toBeNull();
    if (result) {
      // This test verifies the URL is parsed correctly
      // The mutation changes \w to \W in an unused config, but we test actual parsing
      expect(result.url).toContain("utm_source=abc123");
      expect(result.url).toContain("ref=test");
      expect(result.protocol).toBe("http:");
      expect(result.host).toBe("example.com");
    }
  });
});