import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse with base URL using slashesDenoteHost', () => {
  it('should correctly parse a relative URL against a base URL that has protocol-relative format', () => {
    // Use a base URL that starts with // (protocol-relative)
    // The code replaces ^// with http://, so baseUrlStr becomes http://example.com
    // With slashesDenoteHost=true, URL.parse handles // correctly
    // With slashesDenoteHost=false, it may not parse the host correctly
    const result = parse('page.html', '//example.com/path/');
    expect(result).not.toBeNull();
    expect(result.host).toBe('example.com');
    expect(result.url).toContain('example.com');
  });
});