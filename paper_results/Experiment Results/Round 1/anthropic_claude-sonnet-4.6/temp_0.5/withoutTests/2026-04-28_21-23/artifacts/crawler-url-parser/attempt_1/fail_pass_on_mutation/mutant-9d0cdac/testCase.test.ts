import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse function', () => {
  it('should correctly handle absolute URLs with multi-character protocols when baseUrl is provided', () => {
    const result = parse('http://example.com/page', 'http://base.com/');
    expect(result).not.toBeNull();
    expect(result!.url).toBe('http://example.com/page');
    expect(result!.host).toBe('example.com');
  });
});