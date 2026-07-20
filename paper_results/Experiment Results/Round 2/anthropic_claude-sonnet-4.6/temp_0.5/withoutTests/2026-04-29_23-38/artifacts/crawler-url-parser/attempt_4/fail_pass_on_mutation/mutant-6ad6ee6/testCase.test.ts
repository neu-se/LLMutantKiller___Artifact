import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse function - fragment removal', () => {
  it('should handle URL where fragment removal affects URL.resolve with base URL', () => {
    // With baseUrlStr provided, currentUrlStr goes through URL.resolve
    // If fragment isn't fully removed from relative URL, it affects resolution
    // Use a relative URL with a fragment that has 2+ chars
    const result = parse('page#section', 'http://example.com/base/');
    
    expect(result).not.toBeNull();
    expect(result!.url).toBe('http://example.com/base/page');
    expect(result!.path).toBe('/base/page');
  });
});