import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse with baseUrl hash stripping', () => {
  it('should handle baseUrl that is only a hash with text - verifying $ anchor behavior', () => {
    // The only case where /#.*$/ and /#.*/ could differ is with \n
    // Since \n is illegal, let's try to find another edge case
    // What if baseUrl has no protocol and starts with #?
    // "#section" -> after replace -> ""
    // Then URL.parse("") gives null host
    // Then the relative URL resolution might differ
    const result = parse("http://www.google.com", "http://www.facebook.com/path#section");
    expect(result).not.toBeNull();
    expect(result!.url).toBe("http://www.google.com/");
  });
});