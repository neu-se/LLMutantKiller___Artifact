import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function', () => {
  it('should throw an error for invalid URLs', () => {
    const url = 'invalid url';
    expect(() => parse(url)).toThrowError();
  });
});