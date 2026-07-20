import { parse } from '../../../../../crawler-url-parser.js';

describe('parse function', () => {
  it('should correctly handle relative URLs', () => {
    const originalUrl = 'www.example.com/path';
    const parsedUrl = parse(originalUrl);
    expect(parsedUrl.url).toBe('http://www.example.com/path');
  });
});