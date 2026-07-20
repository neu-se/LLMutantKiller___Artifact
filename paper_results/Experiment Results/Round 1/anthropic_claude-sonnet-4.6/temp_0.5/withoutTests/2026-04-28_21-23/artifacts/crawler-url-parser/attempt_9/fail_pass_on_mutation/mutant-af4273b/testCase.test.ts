import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse', () => {
  it('should preserve query string encoding in baseurl when resolving relative URL', () => {
    const result = parse('page', 'http://example.com/section/?a=hello%20world');
    expect(result).not.toBeNull();
    // With parseQueryString=true, query={a:'hello world'}, URL.format uses search='?a=hello%20world'
    // Both should preserve the original encoding via search property
    expect(result!.baseurl).toBe('http://example.com/section/?a=hello%20world');
  });
});