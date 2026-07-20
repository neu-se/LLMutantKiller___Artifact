import { parse } from '../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function', () => {
  it('should correctly parse URL query parameters when strictQueryParsing is enabled', () => {
    const url = 'https://example.com/path?a=1&b=2';
    const result = parse(url);
    expect(result.search).toBe('?a=1&b=2');
    expect(result.querycount).toBe(2);
  });
});