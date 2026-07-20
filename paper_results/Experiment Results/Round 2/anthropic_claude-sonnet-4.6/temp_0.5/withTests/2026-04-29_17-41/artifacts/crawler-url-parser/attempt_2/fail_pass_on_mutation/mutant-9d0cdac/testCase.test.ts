import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse https URL with baseUrl', () => {
  it('should correctly parse an https URL when a baseUrl is provided', () => {
    // Original regex \w+: matches "https:" so http:// is NOT prepended.
    // Mutated regex \w: does NOT match "https:" (multiple chars before colon),
    // causing http:// to be prepended, making the URL invalid and returning null.
    const result = parse("https://www.google.com", "http://www.facebook.com");
    expect(result).not.toBeNull();
    expect(result!.url).toBe("https://www.google.com/");
  });
});