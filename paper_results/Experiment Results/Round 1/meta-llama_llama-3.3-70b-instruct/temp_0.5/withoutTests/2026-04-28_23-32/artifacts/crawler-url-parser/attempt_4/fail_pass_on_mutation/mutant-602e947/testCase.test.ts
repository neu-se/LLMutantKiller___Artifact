import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function', () => {
  it('should correctly handle URLs without protocol and with subdomain', () => {
    const url = 'subdomain.localhost/path/to/resource';
    const result = parse(url);
    expect(result).not.toBeNull();
    expect(result.protocol).toBe('http:');
  });
});