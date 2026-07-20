import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('crawler-url-parser', () => {
  it('should correctly handle URL with encoded query string', () => {
    const url = 'https://www.example.com/path?a=1&b=%3F%3D%23fragment';
    const result = parse(url);
    expect(result).not.toBeNull();
    expect(result.search).toBe('?a=1&b=?=#');
    expect(result.hash).toBeUndefined();
    expect(result.querycount).toBe(2);
  });
});