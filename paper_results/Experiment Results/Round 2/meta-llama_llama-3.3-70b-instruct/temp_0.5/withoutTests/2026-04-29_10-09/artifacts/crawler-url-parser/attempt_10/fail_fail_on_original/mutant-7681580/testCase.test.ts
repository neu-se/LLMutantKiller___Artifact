import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function', () => {
  it('should correctly handle URLs without a protocol', () => {
    const url = 'http:example.com';
    const result = parse(url);
    expect(result).toBeNull(); // This should pass on the original code and fail on the mutated code
  });
});