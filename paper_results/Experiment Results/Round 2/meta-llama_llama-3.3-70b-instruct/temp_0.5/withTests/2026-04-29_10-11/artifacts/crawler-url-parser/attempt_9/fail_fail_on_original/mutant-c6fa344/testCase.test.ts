import { parse } from './crawler-url-parser';

describe('parse function', () => {
  it('should correctly parse URLs without protocol and with two forward slashes', () => {
    const url = '//example.com';
    const expectedUrl = 'http://example.com/';
    const result = parse(url);
    expect(result.url).toBe(expectedUrl);
  });

  it('should incorrectly parse URLs without protocol and with two forward slashes in the mutated code', () => {
    const url = '//example.com';
    const expectedUrl = 'http://:example.com/'; // This should fail in the mutated code
    const result = parse(url);
    expect(result.url).toBe(expectedUrl);
  });
});