import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse URL with multi-char word protocol with base URL', () => {
  it('should treat a URL like "ab:something" as having a protocol when base URL is provided', () => {
    // With original \w+: matches "ab:" so no http:// prepended → protocol "ab:" → returns null (invalid protocol)
    // With mutated \w: does NOT match "ab:" → http:// prepended → "http://ab:something" → different result
    const result = parse("ab:something", "http://www.facebook.com");
    expect(result).toBeNull();
  });
});