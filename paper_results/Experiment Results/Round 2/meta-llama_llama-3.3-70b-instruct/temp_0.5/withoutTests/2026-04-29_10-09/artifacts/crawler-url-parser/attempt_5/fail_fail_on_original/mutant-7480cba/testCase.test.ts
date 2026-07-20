import { parse } from '../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function', () => {
  it('should handle URLs without protocols correctly', () => {
    const url = ':example.com';
    const resultOriginal = parse(url);
    expect(resultOriginal).toBeNull();
  });
});