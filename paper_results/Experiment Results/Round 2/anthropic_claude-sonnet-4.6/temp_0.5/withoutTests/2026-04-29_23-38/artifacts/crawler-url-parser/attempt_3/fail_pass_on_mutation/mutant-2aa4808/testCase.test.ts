import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse', () => {
  it('should correctly parse relative URL with a base URL that has no explicit protocol slashes', () => {
    // baseUrlStr without ^// prefix but with implicit host via slashesDenoteHost
    // Try a base URL where slashesDenoteHost matters for host parsing
    const result = parse('page', 'http://example.com/dir/');
    expect(result).not.toBeNull();
    expect((result as any).host).toBe('example.com');
  });
});