import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function', () => {
  it('should correctly handle URLs starting with a non-protocol string', () => {
    const url = ' example.com';
    expect(parse(url)).not.toBeNull();
  });
});