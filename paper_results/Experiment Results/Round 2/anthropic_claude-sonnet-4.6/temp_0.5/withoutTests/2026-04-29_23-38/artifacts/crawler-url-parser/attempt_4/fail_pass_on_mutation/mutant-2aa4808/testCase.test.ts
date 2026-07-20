import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse', () => {
  it('should resolve relative URL with base URL containing query string', () => {
    const result = parse('relative', 'http://example.com/path/?key=value');
    expect(result).not.toBeNull();
    expect((result as any).url).toBe('http://example.com/path/relative');
    expect((result as any).baseurl).toBe('http://example.com/path/?key=value');
  });
});