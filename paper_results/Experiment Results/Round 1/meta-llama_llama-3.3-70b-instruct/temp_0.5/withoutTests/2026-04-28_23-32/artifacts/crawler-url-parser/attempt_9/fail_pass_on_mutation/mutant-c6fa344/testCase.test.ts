import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function', () => {
  it('should correctly handle URLs without a protocol', () => {
    const url = '//example.com/path';
    const resultOriginal = parse(url);
    expect(resultOriginal.protocol).toBe('http:');
  });
});