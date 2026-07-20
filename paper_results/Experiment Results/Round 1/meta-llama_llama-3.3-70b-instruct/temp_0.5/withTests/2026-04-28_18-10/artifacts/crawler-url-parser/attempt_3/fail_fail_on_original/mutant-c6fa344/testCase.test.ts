import { parse } from '../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function', () => {
  it('should handle protocol-less URLs correctly', () => {
    const originalUrl = 'example.com';
    const result = parse(originalUrl);
    expect(result.url).toBe('http://example.com/');
  });
});