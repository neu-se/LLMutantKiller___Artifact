import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function', () => {
  it('should correctly handle URLs starting with a non-protocol string and a whitespace', () => {
    const url = ' example.com';
    const originalResult = parse(url);
    expect(originalResult).toBeNull();
    const mutatedResult = parse(url);
    expect(mutatedResult).not.toBeNull();
  });
});