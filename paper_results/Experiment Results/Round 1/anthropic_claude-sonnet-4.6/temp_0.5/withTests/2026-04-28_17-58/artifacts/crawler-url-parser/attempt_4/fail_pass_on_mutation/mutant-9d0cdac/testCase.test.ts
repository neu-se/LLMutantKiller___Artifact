import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse URL with two-char protocol with base URL', () => {
  it('should return null for a URL with an unrecognized two-char protocol when base URL is provided', () => {
    // Original: \w+: matches "go:" → no http:// prepend → protocol "go:" → returns null
    // Mutated: \w: does NOT match "go:" → http:// prepended → "http://go:something" → not null
    const result = parse("go:something", "http://www.facebook.com");
    expect(result).toBeNull();
  });
});