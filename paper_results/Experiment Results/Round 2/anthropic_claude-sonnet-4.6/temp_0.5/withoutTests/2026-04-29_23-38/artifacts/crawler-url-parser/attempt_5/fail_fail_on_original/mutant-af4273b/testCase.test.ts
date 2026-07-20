import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse', () => {
  it('should handle base URL with plus signs in query string', () => {
    // If parseQueryString=true causes search to be null and query to be object,
    // then URL.format would use qs.stringify which encodes + as %20
    // If parseQueryString=false, search is preserved with +
    const result = parse('', 'http://example.com/path?q=hello+world');
    // With parseQueryString=true (original): if search=null, query={q:'hello world'}
    //   -> qs.stringify -> q=hello%20world
    // With parseQueryString=false (mutated): search='?q=hello+world'
    //   -> q=hello+world
    expect(result).not.toBeNull();
    expect(result.url).toBe('http://example.com/path?q=hello%20world');
  });
});