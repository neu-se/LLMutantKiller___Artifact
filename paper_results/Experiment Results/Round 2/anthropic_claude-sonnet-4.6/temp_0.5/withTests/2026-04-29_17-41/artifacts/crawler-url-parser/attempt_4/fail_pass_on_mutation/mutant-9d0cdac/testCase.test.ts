import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse URL with two-char non-http scheme and baseUrl', () => {
  it('should return null for a two-char non-http protocol URL when baseUrl is provided', () => {
    // Original: \w+: matches "go:" so no http:// prepended, URL.parse sees "go:" protocol -> not http/https -> null
    // Mutated: \w: does NOT match "go:" (2 chars before colon), so http:// IS prepended
    // -> "http://go:something" -> valid URL -> NOT null
    const result = parse("go:something", "http://www.example.com/");
    expect(result).toBeNull();
  });
});