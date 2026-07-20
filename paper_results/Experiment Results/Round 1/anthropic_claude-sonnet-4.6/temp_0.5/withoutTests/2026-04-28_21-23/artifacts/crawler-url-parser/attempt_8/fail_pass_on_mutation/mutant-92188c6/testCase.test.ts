import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse', () => {
  it('should handle percent-encoded query parameter in relative URL', () => {
    // %20 in query: with true, decoded to space then re-encoded as %20 by querystring
    // with false, search string used as-is preserving %20
    // The difference: querystring.stringify encodes space as %20, but the object key might differ
    const result = parse('page?a%5B%5D=1', 'http://example.com/dir/');
    expect(result).not.toBeNull();
    // With parseQueryString=true: query={'a[]':'1'} -> stringify -> a%5B%5D=1 or a[]=1
    // With parseQueryString=false: search='?a%5B%5D=1' used directly
    expect(result!.url).not.toBeNull();
    expect(result!.querycount).toBe(1);
  });
});