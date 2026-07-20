import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse', () => {
  it('should correctly handle ws:// URL when baseUrl is provided', () => {
    // ws: is 2 chars - matches \w+: (original) but not \w: (mutant)
    // Original: ws: recognized as protocol-like, no http:// prepend, ws: != http/https → null
    // Mutant: ws: not recognized, http:// prepended → http://ws://example.com → protocol http: → non-null with wrong host
    const result = parse('ws://example.com', 'http://base.com/');
    expect(result).toBeNull();
  });
});