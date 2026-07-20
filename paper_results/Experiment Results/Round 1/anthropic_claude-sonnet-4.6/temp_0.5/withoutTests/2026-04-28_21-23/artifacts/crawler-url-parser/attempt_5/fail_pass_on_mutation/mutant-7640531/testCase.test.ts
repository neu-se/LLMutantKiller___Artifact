import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse', () => {
  it('should handle URL where fragment removal exposes different behavior', () => {
    // Try a URL with content after fragment that looks like a valid URL component
    // when not properly stripped
    const result = parse('http://example.com/page#anchor');
    expect(result).not.toBeNull();
    expect(result!.path).toBe('/page');
    expect(result!.url).toBe('http://example.com/page');
  });
});