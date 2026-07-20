import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse relative URL with plus-encoded query parameter', () => {
  it('should normalize plus sign in query string when resolving relative URL against base URL', () => {
    const result = parse('path?q=a+b', 'http://www.example.com/base/');
    expect(result).not.toBeNull();
    // With parseQueryString=true (original): + decoded to space by qs.parse, then re-encoded as %20 by qs.stringify
    // With parseQueryString=false (mutant): + preserved in search string
    expect(result.url).toBe('http://www.example.com/base/path?q=a%20b');
  });
});