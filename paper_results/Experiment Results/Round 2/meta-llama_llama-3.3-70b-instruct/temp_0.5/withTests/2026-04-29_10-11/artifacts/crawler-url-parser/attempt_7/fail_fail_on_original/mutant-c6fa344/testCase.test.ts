import { parse } from '../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function', () => {
  it('should correctly parse URLs without protocol and with two forward slashes', () => {
    const url = '//example.com';
    const expectedUrl = 'http://example.com/';
    const result = parse(url);
    expect(result.url).toBe(expectedUrl);
  });

  it('should fail to parse URLs without protocol and with a colon in the hostname part', () => {
    const url = 'example:com';
    const result = parse(url);
    expect(result).toBeNull();
  });
});