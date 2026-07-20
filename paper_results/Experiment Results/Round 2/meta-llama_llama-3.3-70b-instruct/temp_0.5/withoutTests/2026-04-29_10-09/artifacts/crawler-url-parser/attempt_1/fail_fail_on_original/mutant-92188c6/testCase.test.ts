import { parse } from '../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function', () => {
  it('should correctly parse a URL with query parameters', () => {
    const url = 'https://example.com/path?a=1&b=2';
    const result = parse(url);
    expect(result.querycount).toBe(2);
  });
});