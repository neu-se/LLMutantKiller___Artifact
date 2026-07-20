import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse', () => {
  it('should handle plus sign in query parameter when resolving relative URL', () => {
    // ?a=hello+world: with parseQueryString=true, query={a:'hello world'} (+ decoded to space)
    // then re-encoded by querystring.stringify as a=hello%20world
    // with parseQueryString=false, search='?a=hello+world' preserved as-is
    const result = parse('page?a=hello+world', 'http://example.com/dir/');
    expect(result).not.toBeNull();
    // Original preserves the + encoding through the second parse
    expect(result!.url).toContain('hello+world');
  });
});