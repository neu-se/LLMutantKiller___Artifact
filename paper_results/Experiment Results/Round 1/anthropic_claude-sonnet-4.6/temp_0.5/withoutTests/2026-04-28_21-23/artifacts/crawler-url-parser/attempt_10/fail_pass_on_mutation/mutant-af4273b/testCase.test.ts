import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse', () => {
  it('should handle base URL with plus sign in query string', () => {
    const result = parse('page', 'http://example.com/section/?q=hello+world');
    expect(result).not.toBeNull();
    expect(result!.baseurl).toBe('http://example.com/section/?q=hello+world');
  });
});