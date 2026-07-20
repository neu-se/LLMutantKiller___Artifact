import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("URL parsing behavior", () => {
  it("should handle URLs with utm_ parameters containing only alphanumeric characters", () => {
    const url = "https://example.com/path?utm_source=test123&ref=abc";
    const result = parse(url);
    expect(result).not.toBeNull();
    // This test verifies the URL is parsed correctly
    // The original regex would match "utm_source" (alphanumeric)
    // The mutated regex would NOT match "utm_source" (alphanumeric)
    expect(result?.url).toBe(url);
  });
});