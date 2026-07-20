import { parse } from './crawler-url-parser.js';

describe('crawler-url-parser', () => {
  it('should correctly remove query parameters', () => {
    const url = 'https://www.example.com/path?a=1&utm_source=google&b=2&ref=123';
    const parsedUrl = parse(url);
    expect(parsedUrl.search).toBe('?a=1&b=2');
  });
});