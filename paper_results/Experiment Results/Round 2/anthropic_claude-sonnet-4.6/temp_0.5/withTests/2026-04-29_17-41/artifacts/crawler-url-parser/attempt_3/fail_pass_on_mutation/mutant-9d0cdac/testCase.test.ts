import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse URL with two-char scheme and baseUrl', () => {
  it('should treat a two-char scheme URL as relative when baseUrl is provided', () => {
    // "ab:test" - with original \w+:, "ab:" matches so it's treated as having a protocol
    // and http:// is NOT prepended. URL.parse gives protocol "ab:" which is invalid -> returns null.
    // With mutated \w:, "ab:" does NOT match (2 chars before colon), so http:// IS prepended
    // giving "http://ab:test" which parses differently.
    const result = parse("ab:test", "http://www.example.com/path/");
    expect(result).toBeNull();
  });
});