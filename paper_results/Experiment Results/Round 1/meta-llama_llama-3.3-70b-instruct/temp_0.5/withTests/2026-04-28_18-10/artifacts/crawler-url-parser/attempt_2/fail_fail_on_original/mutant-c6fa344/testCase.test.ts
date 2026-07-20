import { parse } from '../../../crawler-url-parser';

describe('parse function', () => {
  it('should handle protocol-less URLs correctly', () => {
    const originalUrl = '//example.com';
    const expectedUrl = 'http://example.com/';
    const result = parse(originalUrl);
    expect(result.url).toBe(expectedUrl);
  });
});