import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse function', () => {
  it('should return null for URLs with non-http protocols when baseUrl is provided', () => {
    // "ftp:" has 3 chars - matches \w+: but not \w:
    // With original: ftp: matches \w+:, no http:// prepended, protocol is ftp: → returns null
    // With mutation: ftp: doesn't match \w:, http:// prepended → http://ftp:... → different result
    const result = parse('ftp://example.com/page', 'http://base.com/');
    expect(result).toBeNull();
  });
});