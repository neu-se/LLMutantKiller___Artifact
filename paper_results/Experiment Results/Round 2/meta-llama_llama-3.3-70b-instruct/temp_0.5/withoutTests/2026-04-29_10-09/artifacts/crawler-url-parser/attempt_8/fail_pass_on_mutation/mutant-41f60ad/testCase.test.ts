import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function', () => {
  it('should correctly parse URLs with query parameters and handle query parsing correctly', () => {
    const url = 'https://www.example.com/path?a=1&b=2&c=3&a=4';
    const result = parse(url);
    if (result === null) {
      throw new Error('Result is null');
    }
    const query = result.search.substring(1); // remove the '?' from the query string
    if (result.search === null) {
      throw new Error('Result search is null');
    }
    const queryParams = query.split('&');
    expect(queryParams.length).toBe(4); 
    const parsedUrl = new URL(url);
    const searchParams = parsedUrl.searchParams;
    expect(searchParams.getAll('a')).toEqual(['1', '4']); 
    expect(searchParams.get('b')).toBe('2'); 
    expect(searchParams.get('c')).toBe('3'); 
  });
});