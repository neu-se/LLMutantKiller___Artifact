import { parse } from '../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser';

describe('parse function', () => {
  it('should handle protocol-less URLs correctly', () => {
    const originalUrl = 'www.example.com';
    const expectedUrl = 'http://www.example.com/';
    const result = parse(originalUrl);
    expect(result.url).toBe(expectedUrl);
  });
});