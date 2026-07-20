import { parse } from '../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function', () => {
  it('should handle URLs without protocols correctly', () => {
    const url = 'www.example.com';
    const result = parse(url);
    expect(result).not.toBeNull();
    expect(result.url).toBe('http://www.example.com');
  });
});