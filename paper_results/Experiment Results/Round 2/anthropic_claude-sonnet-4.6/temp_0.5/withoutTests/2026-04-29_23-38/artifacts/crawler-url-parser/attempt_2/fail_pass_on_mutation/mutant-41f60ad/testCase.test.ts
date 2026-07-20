import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse', () => {
  it('should preserve query string search property correctly', () => {
    // When parseQueryString=true, URL.format uses query object, rebuilding search
    // When parseQueryString=false, URL.format uses raw search string
    // The difference: with true, format omits 'search' and uses 'query' object
    // This means ret.url will differ when search has encoded characters
    const result = parse('http://example.com/page?q=hello%20world');
    expect(result).not.toBeNull();
    // With parseQueryString=true: query={q:'hello world'}, format re-encodes to ?q=hello%20world
    // With parseQueryString=false: query='q=hello%20world', search='?q=hello%20world'
    expect(result.url).toContain('?q=hello%20world');
  });
});