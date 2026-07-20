import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function', () => {
  it('should correctly handle URLs without a protocol', () => {
    const url = 'example.com';
    const resultOriginal = parse(url);
    const resultMutated = parse('//example.com');
    expect(resultOriginal.url).not.toBe(resultMutated.url);
  });
});