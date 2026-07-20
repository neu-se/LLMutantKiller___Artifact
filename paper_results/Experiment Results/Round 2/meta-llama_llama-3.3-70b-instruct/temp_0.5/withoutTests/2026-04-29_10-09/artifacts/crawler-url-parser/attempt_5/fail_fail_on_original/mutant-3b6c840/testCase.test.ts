import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('crawler-url-parser', () => {
  it('should not have different URLs when removeTrailingSlash is true', () => {
    const url1 = 'https://www.example.com/path/';
    const url2 = 'https://www.example.com/path';
    const result1 = parse(url1);
    const result2 = parse(url2);
    if (result1 === null || result2 === null) {
      throw new Error('parse returned null');
    }
    expect(result1.url).not.toBe(`${result2.url}/`);
  });
});