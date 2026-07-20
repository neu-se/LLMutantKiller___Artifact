import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('crawler-url-parser', () => {
  it('should remove trailing slash from URL', () => {
    const url = 'https://www.example.com/path/';
    const result = parse(url);
    if (result === null) {
      throw new Error('parse returned null');
    }
    if (result.url === null) {
      throw new Error('result.url is null');
    }
    const lastChar = result.url[result.url.length - 1];
    expect(lastChar).not.toBe('/');
  });
});