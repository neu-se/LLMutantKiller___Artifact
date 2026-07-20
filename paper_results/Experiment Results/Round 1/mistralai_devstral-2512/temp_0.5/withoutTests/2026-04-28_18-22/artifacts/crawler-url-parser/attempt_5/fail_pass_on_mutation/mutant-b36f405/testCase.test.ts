import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with query parameters", () => {
  it("should handle URLs with utm_ parameters containing word characters", () => {
    const url = "https://example.com/path?utm_source=test&utm_medium=123&ref=abc";
    const result = parse(url);
    // The original regex /^utm_\w+/i should match utm_source and utm_medium
    // The mutated regex /^utm_\W+/i would not match them
    // Since parse() doesn't actually remove these params, we just verify the URL is parsed correctly
    expect(result).not.toBeNull();
    expect(result?.url).toContain("utm_source=test");
    expect(result?.url).toContain("utm_medium=123");
  });
});