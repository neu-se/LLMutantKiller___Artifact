import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse', () => {
  it('should handle plus sign in query string', () => {
    const result = parse('http://example.com/?q=hello+world');
    expect(result).not.toBeNull();
    // If parseQueryString=true, query={q:'hello world'} (+ decoded to space)
    // URL.format might re-encode as %20 if it uses query object
    // If parseQueryString=false, query='q=hello+world', search='?q=hello+world'
    // URL.format uses search -> keeps +
    expect(result!.url).toContain('+');
  });
});