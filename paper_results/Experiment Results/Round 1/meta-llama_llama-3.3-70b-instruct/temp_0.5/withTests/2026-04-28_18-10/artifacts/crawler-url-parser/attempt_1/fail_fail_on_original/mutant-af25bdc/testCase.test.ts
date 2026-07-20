import { parse } from '../../../crawler-url-parser.js';

describe('parse function', () => {
  it('should return null when given an invalid protocol', () => {
    const url = 'htp://www.google.com';
    const result = parse(url);
    expect(result).toBeNull();
  });

  it('should return a parsed URL object when given a valid URL', () => {
    const url = 'http://www.google.com';
    const result = parse(url);
    expect(result).toHaveProperty('url', 'http://www.google.com/');
    expect(result).toHaveProperty('domain', 'google.com');
    expect(result).toHaveProperty('host', 'www.google.com');
    expect(result).toHaveProperty('path', '/');
    expect(result).toHaveProperty('protocol', 'http:');
    expect(result).toHaveProperty('querycount', 0);
    expect(result).toHaveProperty('search', '');
    expect(result).toHaveProperty('subdomain', 'www');
  });
});