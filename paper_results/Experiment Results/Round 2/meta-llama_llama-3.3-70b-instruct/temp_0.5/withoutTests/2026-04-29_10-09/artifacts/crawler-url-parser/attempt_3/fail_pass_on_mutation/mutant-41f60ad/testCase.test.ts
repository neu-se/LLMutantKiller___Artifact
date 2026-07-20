import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function', () => {
  it('should correctly parse URLs with query parameters and handle query parsing correctly', () => {
    const url = 'https://www.example.com/path?a=1&b=2&c=3';
    const result = parse(url);
    expect(result.querycount).toBe(3);
    const query = result.search.substring(1); // remove the '?' from the query string
    const queryParams = query.split('&');
    expect(queryParams).toEqual(expect.arrayContaining(['a=1', 'b=2', 'c=3']));
  });
});