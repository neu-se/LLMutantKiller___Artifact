import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("URL parsing with query parameters", () => {
  it("should handle URLs with utm_ parameters containing alphanumeric characters", () => {
    const url = "https://example.com/path?utm_source=test123&ref=abc";
    const result = parse(url);
    expect(result).not.toBeNull();
    // The original regex would match "utm_source" (alphanumeric)
    // The mutated regex would NOT match "utm_source" (alphanumeric)
    // Since parse() doesn't filter params, we verify the URL is parsed correctly
    expect(result?.url).toBe(url);
  });
});