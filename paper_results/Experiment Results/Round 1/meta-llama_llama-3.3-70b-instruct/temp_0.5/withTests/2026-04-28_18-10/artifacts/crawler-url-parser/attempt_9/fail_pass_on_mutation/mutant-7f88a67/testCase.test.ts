import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function with http protocol and normalize options', () => {
  it('should start with http when normalizeHttps is false', () => {
    const url = 'http://example.com';
    const result = parse(url);
    expect(result.url.startsWith('http:')).toBe(true);
  });
});