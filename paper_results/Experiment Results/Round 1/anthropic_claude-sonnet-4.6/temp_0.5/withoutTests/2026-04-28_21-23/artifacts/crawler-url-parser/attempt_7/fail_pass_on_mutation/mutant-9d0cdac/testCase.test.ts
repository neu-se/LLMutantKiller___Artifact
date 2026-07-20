import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse', () => {
  it('should correctly parse an absolute http URL when a baseUrl is also provided', () => {
    const result = parse('http://example.com/page', 'http://base.com/');
    expect(result).not.toBeNull();
    expect(result!.host).toBe('example.com');
    expect(result!.domain).toBe('example.com');
    expect(result!.url).toBe('http://example.com/page');
  });
});