import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse', () => {
  it('should set baseurl correctly when base URL has no query string', () => {
    const result = parse('relative', 'http://example.com/page');
    expect(result).not.toBeNull();
    // Original: baseurl has trailing '?' due to parseQueryString=true producing query={}
    // Mutated: baseurl has no trailing '?' due to parseQueryString=false producing query=null
    expect(result!.baseurl).toBe('http://example.com/page?');
  });
});