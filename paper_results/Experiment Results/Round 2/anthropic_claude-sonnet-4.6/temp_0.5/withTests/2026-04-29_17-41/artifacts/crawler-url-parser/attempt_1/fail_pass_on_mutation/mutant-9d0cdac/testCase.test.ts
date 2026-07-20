import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse with baseUrl and protocol URL', () => {
  it('should correctly parse an http URL when a baseUrl is provided, without prepending extra protocol', () => {
    // When currentUrlStr is "http://www.google.com" and baseUrlStr is provided,
    // the original regex \w+: matches "http:" (multiple word chars + colon),
    // so http:// is NOT prepended again.
    // The mutated regex \w: only matches a single word char + colon,
    // so it does NOT match "http:", causing http:// to be prepended,
    // resulting in "http://http://www.google.com" which fails to parse (returns null or wrong result).
    const result = parse("http://www.google.com", "http://www.facebook.com");
    expect(result).not.toBeNull();
    expect(result!.url).toBe("http://www.google.com/");
    expect(result!.host).toBe("www.google.com");
  });
});