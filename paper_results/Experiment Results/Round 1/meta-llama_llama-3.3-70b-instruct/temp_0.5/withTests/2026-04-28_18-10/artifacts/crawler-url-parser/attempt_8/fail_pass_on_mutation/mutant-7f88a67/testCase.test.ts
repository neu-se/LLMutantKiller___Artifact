import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function with http protocol and normalize options', () => {
  it('should have http in the url when normalizeHttps is false', () => {
    const url = 'http://example.com';
    const result = parse(url);
    expect(result.url).toContain('http');
  });
});