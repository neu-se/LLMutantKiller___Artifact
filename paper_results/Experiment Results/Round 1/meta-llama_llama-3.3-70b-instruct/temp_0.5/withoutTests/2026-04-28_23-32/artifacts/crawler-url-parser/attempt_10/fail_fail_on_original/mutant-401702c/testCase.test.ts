import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function', () => {
  it('should correctly handle URLs starting with a special character', () => {
    const url = '!example.com';
    expect(parse(url)).toBeNull();
  });
});