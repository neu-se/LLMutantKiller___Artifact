import { parse } from '../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function', () => {
  it('should correctly handle URLs without a protocol', () => {
    const url = 'www.example.com';
    const baseUrl = 'http://example.com';
    const result = parse(url, baseUrl);
    expect(result.url).toBe('http://www.example.com');
  });
});