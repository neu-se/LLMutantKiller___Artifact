import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function', () => {
  it('should correctly parse URLs with query parameters and handle query parsing correctly', () => {
    const url = 'https://www.example.com/path?a=1&b=2&c=3';
    const result = parse(url);
    if (result === null) {
      throw new Error('Result is null');
    }
    const query = result.search.substring(1); // remove the '?' from the query string
    if (result.search === null) {
      throw new Error('Result search is null');
    }
    const queryParams = query.split('&');
    const obj = {};
    queryParams.forEach(param => {
      const [key, value] = param.split('=');
      obj[key] = value;
    });
    expect(Object.keys(obj).length).toBe(3);
    expect(obj).toEqual({ a: '1', b: '2', c: '3' });
  });
});