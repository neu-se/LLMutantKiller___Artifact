import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function', () => {
  it('should correctly handle relative URLs', () => {
    const originalUrl = 'example.com#';
    const parsedUrl = parse(originalUrl);
    expect(parsedUrl.url).toBe('http://example.com/');
  });
});