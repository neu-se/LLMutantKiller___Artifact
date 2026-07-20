import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function with http protocol and normalize options', () => {
  it('should not change the protocol to https when normalizeHttps is false', () => {
    const url = 'http://example.com';
    const result = parse(url);
    expect(result.protocol).not.toBe('https:');
  });
});