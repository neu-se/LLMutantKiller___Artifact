import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse', () => {
  it('parses a full http URL without base URL correctly', () => {
    // Without base URL, http://example.com should parse correctly
    // Original regex /^(?!(?:\w+:)?\/\/)/ only matches at position 0
    // Mutated regex /(?!(?:\w+:)?\/\/)/ can match at position 4 for http:// URLs
    // causing corruption like "httphttp:////example.com"
    const result = parse('http://example.com/path');
    expect(result).not.toBeNull();
    expect(result!.url).toBe('http://example.com/path');
  });
});