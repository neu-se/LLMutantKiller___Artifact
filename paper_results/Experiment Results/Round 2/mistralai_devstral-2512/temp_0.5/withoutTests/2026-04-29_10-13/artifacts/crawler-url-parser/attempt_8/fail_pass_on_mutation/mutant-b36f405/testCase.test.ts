import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with query parameters", () => {
  it("should handle URLs with utm_ parameters containing word characters", () => {
    const url = "http://example.com/path?utm_source=test123&ref=abc";
    const result = parse(url);
    expect(result).not.toBeNull();
    if (result) {
      // The original regex /^utm_\w+/i matches utm_ followed by word characters
      // The mutated regex /^utm_\W+/i matches utm_ followed by non-word characters
      // Since the config isn't used, we test the actual behavior
      expect(result.url).toContain("utm_source=test123");
      expect(result.url).toContain("ref=abc");
    }
  });
});