import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('mutation detection for protocol regex', () => {
  it('should handle URL with two-letter scheme and base URL correctly', () => {
    // "ab:test" - original \w+: matches "ab:" so no prepend, URL.parse sees protocol "ab:" -> null
    // mutated \w: doesn't match "ab:" -> prepends http:// -> "http://ab:test"
    // URL.parse("http://ab:test") -> host="ab", path depends on "test" being a port or path
    // With baseUrl present, this goes through resolve path differently
    const resultWithBase = parse("ab:test", "http://www.example.com");
    const resultNoBase = parse("ab:test");
    // Both original and mutated should return null without base (no base = no regex check)
    // With base: original returns null (invalid protocol ab:), mutated returns non-null
    expect(resultWithBase).toBeNull();
    expect(resultNoBase).toBeNull();
  });
});