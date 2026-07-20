import { parse } from './crawler-url-parser';

describe('parse function', () => {
  it('should correctly handle URLs without protocol', () => {
    const url = 'localhost/path/to/resource';
    const result = parse(url);
    expect(result).not.toBeNull();
    expect(result.protocol).toBe('http:');
  });
});