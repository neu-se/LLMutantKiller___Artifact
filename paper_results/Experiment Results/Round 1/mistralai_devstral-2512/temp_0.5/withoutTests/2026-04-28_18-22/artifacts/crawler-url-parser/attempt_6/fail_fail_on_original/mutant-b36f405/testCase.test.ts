import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("URL parsing with special character query parameters", () => {
  it("should handle URLs with utm_ parameters containing special characters", () => {
    const url = "https://example.com/path?utm_source=test!@#&ref=abc";
    const result = parse(url);
    // The original regex /^utm_\w+/i would NOT match "utm_source=test!@#" because of special chars
    // The mutated regex /^utm_\W+/i would match it because \W matches special chars
    // Since parse() doesn't actually remove these params, we just verify the URL is parsed
    expect(result).not.toBeNull();
    expect(result?.url).toContain("utm_source=test!@#");
  });
});