import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with query parameters", () => {
  it("should handle UTM parameters with different casing", () => {
    const urlWithLowercase = "https://example.com/path?utm_source=test&other=value";
    const urlWithUppercase = "https://example.com/path?UTM_SOURCE=test&other=value";
    const result1 = parse(urlWithLowercase);
    const result2 = parse(urlWithUppercase);
    expect(result1).not.toBeNull();
    expect(result2).not.toBeNull();
    // The original should remove both (case-insensitive regex)
    // The mutated should only remove lowercase (case-sensitive regex)
    expect(result1.url).toBe("https://example.com/path?other=value");
    expect(result2.url).toBe("https://example.com/path?other=value");
  });
});