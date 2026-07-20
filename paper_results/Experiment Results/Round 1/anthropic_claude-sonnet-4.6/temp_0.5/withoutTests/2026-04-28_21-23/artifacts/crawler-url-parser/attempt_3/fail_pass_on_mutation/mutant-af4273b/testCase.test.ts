import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse', () => {
  it('should correctly resolve relative URL with query against base URL with query', () => {
    const result = parse('?newparam=1', 'http://example.com/page?oldparam=2');
    expect(result).not.toBeNull();
    expect(result!.url).toBe('http://example.com/page?newparam=1');
    expect(result!.querycount).toBe(1);
  });
});