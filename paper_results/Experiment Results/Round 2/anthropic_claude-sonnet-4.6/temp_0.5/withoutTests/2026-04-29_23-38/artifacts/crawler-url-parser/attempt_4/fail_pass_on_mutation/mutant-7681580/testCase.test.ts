import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function", () => {
  it("should return null for a URL that becomes malformed due to incorrect protocol prepending", () => {
    // 'http://example.com' enters the no-baseUrl block since 'h' is not followed by ':' directly
    // Original: ^(?!...) only checks position 0, sees http:// already there, no replacement
    // Mutated: without ^, inserts http:// at position 4, making 'httphttp:////example.com'
    // which has protocol 'httphttp:' - not http: or https:, so returns null
    const result = parse("http://example.com");
    expect(result).not.toBeNull();
    expect(result!.url).toBe("http://example.com/");
  });
});