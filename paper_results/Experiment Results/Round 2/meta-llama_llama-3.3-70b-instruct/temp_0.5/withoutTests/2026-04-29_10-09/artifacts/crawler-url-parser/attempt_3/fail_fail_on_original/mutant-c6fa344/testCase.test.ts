import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function', () => {
  it('should correctly handle URLs without a protocol', () => {
    const url = 'www.example.com:8080';
    const result = parse(url);
    expect(result.url).toBe('http://www.example.com:8080');
  });
});