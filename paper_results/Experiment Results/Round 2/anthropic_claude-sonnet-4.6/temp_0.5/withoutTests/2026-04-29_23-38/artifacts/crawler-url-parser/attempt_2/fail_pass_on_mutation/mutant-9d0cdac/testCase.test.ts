import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function protocol detection with baseUrl", () => {
  it("should treat a two-character protocol URL as absolute when baseUrl is provided", () => {
    // 'ab:path' has a 2-char protocol prefix
    // Original: \w+: matches 'ab:', so no http:// prepended, parsedUrl.host is null -> resolves relative to base
    // Mutated: \w: does NOT match 'ab:', so http:// is prepended -> 'http://ab:path' -> different result
    // We use a known protocol 'http' with a relative-looking path to expose the difference
    // Use a URL like 'go:something' with baseUrl
    const result = parse("go:something", "http://base.com/");
    
    // In original: 'go:' matches \w+:, no prepend; URL.parse('go:something') has protocol 'go:'
    // which is not http/https, so returns null
    // In mutated: 'go:' doesn't match \w:, http:// prepended -> 'http://go:something'
    // URL.parse('http://go:something') -> host='go', path='/something', protocol='http:'
    // returns non-null result
    expect(result).toBeNull();
  });
});